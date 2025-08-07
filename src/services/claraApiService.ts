/**
 * Archie Assistant API Service
 * 
 * Main orchestrator service that coordinates between specialized services
 * for provider management, tools, agents, chat, and attachments.
 */

import type { ChatMessage } from '../utils/APIClient';
import { 
  ArchieMessage, 
  ArchieFileAttachment, 
  ArchieProvider, 
  ArchieModel, 
  ArchieAIConfig
} from '../types/archie_assistant_types';
import { addCompletionNotification, addInfoNotification } from './notificationService';
import { TokenLimitRecoveryService } from './tokenLimitRecoveryService';

// Import specialized services
import { archieProviderService } from './archieProviderService';
import { archieToolService } from './archieToolService';
import { archieAgentService } from './archieAgentService';
import { archieChatService } from './archieChatService';
import { archieModelService } from './archieModelService';
import { archieAttachmentService } from './archieAttachmentService';

export class ArchieApiService {
  private recoveryService: TokenLimitRecoveryService;
  private stopExecution: boolean = false;

  constructor() {
    // Initialize the recovery service
    this.recoveryService = TokenLimitRecoveryService.getInstance();
  }

  /**
   * Send a chat message
   */
  public async sendChatMessage(
    message: string,
    config: ArchieAIConfig,
    attachments?: ArchieFileAttachment[],
    systemPrompt?: string,
    conversationHistory?: ArchieMessage[],
    onContentChunk?: (content: string) => void
  ): Promise<ArchieMessage> {
    const client = archieProviderService.getCurrentClient();
    if (!client) {
      throw new Error('No API client configured. Please select a provider.');
    }

    // Switch to the provider specified in config if different from current
    await this.ensureCorrectProvider(config, onContentChunk);

    try {
      // Process file attachments if any
      const processedAttachments = await archieAttachmentService.processFileAttachments(attachments || []);

      // Determine the appropriate model based on context and auto selection settings
      let modelId = archieModelService.selectAppropriateModel(config, message, processedAttachments, conversationHistory);
      
      // Extract model ID from provider prefix if present
      modelId = archieModelService.extractModelId(modelId);

      // Get tools if enabled
      const tools = await archieToolService.getAvailableTools(config, onContentChunk);

      // Check if autonomous agent mode is enabled
      const isAutonomousMode = config.autonomousAgent?.enabled !== false;
      
      if (isAutonomousMode) {
        console.log(`🤖 Autonomous agent mode enabled - using new agent system`);
        
        // Add notification for autonomous mode start
        addInfoNotification(
          'Autonomous Mode Activated',
          'Archie is now operating in autonomous mode.',
          3000
        );

        // Execute autonomous agent workflow
        const result = await archieAgentService.executeAutonomousAgent(
          client,
          modelId, 
          message,
          tools, 
          config, 
          processedAttachments,
          systemPrompt,
          conversationHistory,
          onContentChunk,
          archieProviderService.getCurrentProvider()?.id
        );

        // Add completion notification for autonomous mode
        const toolsUsed = result.metadata?.toolsUsed || [];
        const agentSteps = result.metadata?.agentSteps || 1;
        
        addCompletionNotification(
          'Autonomous Agent Complete',
          `Completed in ${agentSteps} steps${toolsUsed.length > 0 ? ` using ${toolsUsed.length} tools` : ''}.`,
          5000
        );

        return result;
      }

        // Execute standard chat workflow
      const shouldDisableStreamingForTools = archieProviderService.shouldDisableStreamingForTools(tools);
      
      const result = await archieChatService.executeStandardChat(
        client,
          modelId, 
        message,
          tools, 
          config,
        processedAttachments,
        systemPrompt,
        conversationHistory,
        onContentChunk,
        archieProviderService.getCurrentProvider()?.id,
        shouldDisableStreamingForTools
        );

        return result;

    } catch (error) {
      console.error('Chat execution failed:', error);
      
      // Check if this is an abort error (user stopped the stream)
      const isAbortError = error instanceof Error && (
        error.message.includes('aborted') ||
        error.message.includes('BodyStreamBuffer was aborted') ||
        error.message.includes('AbortError') ||
        error.name === 'AbortError'
      );
      
      if (isAbortError) {
        console.log('Stream was aborted by user, returning partial content');
        
        return {
          id: `${Date.now()}-aborted`,
          role: 'assistant',
          content: '',
          timestamp: new Date(),
          metadata: {
            model: `${config.provider}:${config.models.text || 'unknown'}`,
            temperature: config.parameters.temperature,
            aborted: true,
            error: 'Stream was stopped by user'
          }
        };
      }
      
      // Return error message only for actual errors (not user aborts)
      return {
        id: `${Date.now()}-error`,
        role: 'assistant',
        content: 'I apologize, but I encountered an error while processing your request. Please try again.',
        timestamp: new Date(),
        metadata: {
          error: error instanceof Error ? error.message : 'Unknown error occurred'
        }
      };
    }
  }

  /**
   * Ensure we're using the correct provider
   */
  private async ensureCorrectProvider(config: ArchieAIConfig, onContentChunk?: (content: string) => void): Promise<void> {
    const currentProvider = archieProviderService.getCurrentProvider();
    
    if (config.provider && (!currentProvider || currentProvider.id !== config.provider)) {
      console.log(`🔄 Switching provider from ${currentProvider?.id || 'none'} to ${config.provider}`);
      try {
        const providers = await archieProviderService.getProviders();
        const requestedProvider = providers.find(p => p.id === config.provider);
        
        if (requestedProvider) {
          console.log(`✅ Found provider ${config.provider}:`, {
            name: requestedProvider.name,
            baseUrl: requestedProvider.baseUrl,
            isEnabled: requestedProvider.isEnabled
          });
          
          if (!requestedProvider.isEnabled) {
            throw new Error(`Provider ${requestedProvider.name} is not enabled`);
          }
          
          // Update the client to use the requested provider
          archieProviderService.updateProvider(requestedProvider);
          console.log(`🚀 Switched to provider: ${requestedProvider.name} (${requestedProvider.baseUrl})`);
          } else {
          throw new Error(`Provider ${config.provider} not found or not configured`);
            }
        } catch (error) {
        console.error(`❌ Failed to switch to provider ${config.provider}:`, error);
        throw new Error(`Failed to switch to provider ${config.provider}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    } else if (config.provider) {
      console.log(`✅ Already using correct provider: ${currentProvider?.name} (${currentProvider?.baseUrl})`);
    }
  }

  // Delegate provider-related methods to archieProviderService
  public async getProviders(): Promise<ArchieProvider[]> {
    return archieProviderService.getProviders();
  }

  public async getModels(providerId?: string): Promise<ArchieModel[]> {
    return archieProviderService.getModels(providerId);
  }

  public async getCurrentProviderModels(): Promise<ArchieModel[]> {
    return archieProviderService.getCurrentProviderModels();
  }

  public async getPrimaryProvider(): Promise<ArchieProvider | null> {
    return archieProviderService.getPrimaryProvider();
  }

  public async setPrimaryProvider(providerId: string): Promise<void> {
    return archieProviderService.setPrimaryProvider(providerId);
  }

  public updateProvider(provider: ArchieProvider): void {
    return archieProviderService.updateProvider(provider);
  }

  public async healthCheck(): Promise<boolean> {
    return archieProviderService.healthCheck();
  }

  public async testProvider(provider: ArchieProvider): Promise<boolean> {
    return archieProviderService.testProvider(provider);
  }

  public getCurrentClient() {
    return archieProviderService.getCurrentClient();
  }

  public getCurrentProvider(): ArchieProvider | null {
    return archieProviderService.getCurrentProvider();
  }

  /**
   * Stop the current chat generation
   */
  public stop(): void {
    // Set stop flag for autonomous mode
    this.stopExecution = true;
    
    // Stop agent execution
    archieAgentService.stop();
    
    // Stop API client streaming
    const client = archieProviderService.getCurrentClient();
    if (client) {
      const apiClient = client as any;
      if (typeof apiClient.abortStream === 'function') {
        apiClient.abortStream();
        console.log('Stream aborted successfully');
      }
    }
  }

  /**
   * Preload/warm up a model
   */
  public async preloadModel(config: ArchieAIConfig, conversationHistory?: ArchieMessage[]): Promise<void> {
    const client = archieProviderService.getCurrentClient();
    if (!client || !config.models.text) {
      return;
    }

    // Only preload for local providers
    const currentProvider = archieProviderService.getCurrentProvider();
    const isLocalProvider = archieModelService.isLocalProvider(config, currentProvider?.baseUrl);
    
    if (!isLocalProvider) {
      return;
    }

    let modelId = archieModelService.selectAppropriateModel(config, '', [], conversationHistory);
    modelId = archieModelService.extractModelId(modelId);

    await archieChatService.preloadModel(client, modelId, config, isLocalProvider);
  }

  /**
   * Record a successful tool execution
   */
  public recordToolSuccess(toolName: string, toolDescription: string, toolCallId?: string): void {
    const currentProvider = archieProviderService.getCurrentProvider();
    archieToolService.recordToolSuccess(
      toolName,
      toolDescription,
      currentProvider?.id || 'unknown',
      toolCallId
    );
  }

  /**
   * Clear incorrectly blacklisted tools
   */
  public clearBlacklistedTools(): void {
    const currentProvider = archieProviderService.getCurrentProvider();
    const client = archieProviderService.getCurrentClient();
    
    if (currentProvider && client) {
      archieToolService.clearBlacklistedTools(currentProvider.id, client);
        
        addInfoNotification(
          'Tools Reset',
        `Cleared incorrectly blacklisted tools for ${currentProvider.name}.`,
          8000
        );
    }
  }
}

// Export singleton instance
export const archieApiService = new ArchieApiService(); 