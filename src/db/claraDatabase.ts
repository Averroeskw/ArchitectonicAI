import { archieDatabaseService } from '../services/archieDatabase';
import { ArchieChatSession, ArchieMessage, ArchieFileAttachment } from '../types/archie_assistant_types';

/**
 * Archie Database Helper
 * Provides convenient methods for Archie chat persistence
 */
export class ArchieDatabase {
  /**
   * Generate a unique ID for messages/sessions
   */
  generateId(): string {
    return crypto.randomUUID();
  }

  /**
   * Create a new Archie chat session
   */
  async createArchieSession(title: string): Promise<ArchieChatSession> {
    const session: ArchieChatSession = {
      id: this.generateId(),
      title,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isStarred: false,
      isArchived: false
    };

    await archieDatabaseService.saveSession(session);
    return session;
  }

  /**
   * Get a Archie chat session by ID
   */
  async getArchieSession(sessionId: string): Promise<ArchieChatSession | null> {
    return await archieDatabaseService.getSession(sessionId);
  }

  /**
   * Save/Update a Archie chat session
   */
  async saveArchieSession(session: ArchieChatSession): Promise<void> {
    await archieDatabaseService.saveSession(session);
  }

  /**
   * Update Archie session metadata
   */
  async updateArchieSession(sessionId: string, updates: Partial<ArchieChatSession>): Promise<void> {
    await archieDatabaseService.updateSession(sessionId, updates);
  }

  /**
   * Delete a Archie chat session
   */
  async deleteArchieSession(sessionId: string): Promise<void> {
    await archieDatabaseService.deleteSession(sessionId);
  }

  /**
   * Get recent Archie chat sessions
   */
  async getRecentArchieSessions(limit: number = 20): Promise<ArchieChatSession[]> {
    return await archieDatabaseService.getRecentSessions(limit);
  }

  /**
   * Get recent Archie chat sessions without messages (for fast loading)
   */
  async getRecentArchieSessionsLight(limit: number = 20, offset: number = 0): Promise<ArchieChatSession[]> {
    return await archieDatabaseService.getRecentSessionsLight(limit, offset);
  }

  /**
   * Get all Archie chat sessions
   */
  async getAllArchieSessions(): Promise<ArchieChatSession[]> {
    return await archieDatabaseService.getAllSessions();
  }

  /**
   * Get starred Archie sessions
   */
  async getStarredArchieSessions(): Promise<ArchieChatSession[]> {
    return await archieDatabaseService.getStarredSessions();
  }

  /**
   * Get archived Archie sessions
   */
  async getArchivedArchieSessions(): Promise<ArchieChatSession[]> {
    return await archieDatabaseService.getArchivedSessions();
  }

  /**
   * Search Archie sessions
   */
  async searchArchieSessions(query: string): Promise<ArchieChatSession[]> {
    return await archieDatabaseService.searchSessions(query);
  }

  /**
   * Add a message to a Archie session
   */
  async addArchieMessage(sessionId: string, message: ArchieMessage): Promise<void> {
    await archieDatabaseService.saveMessage(sessionId, message);
    
    // Update session's updatedAt timestamp
    await archieDatabaseService.updateSession(sessionId, {
      updatedAt: new Date()
    });
  }

  /**
   * Get Archie storage statistics
   */
  async getArchieStorageStats(): Promise<{
    totalSessions: number;
    totalMessages: number;
    totalFiles: number;
    totalSize: number;
  }> {
    return await archieDatabaseService.getStorageStats();
  }

  /**
   * Clear all Archie chat sessions, messages, and files
   * WARNING: This will permanently delete all chat history
   */
  async clearAllArchieSessions(): Promise<void> {
    return await archieDatabaseService.clearAllSessions();
  }

  /**
   * Debug data integrity and check for orphaned data
   */
  async debugDataIntegrity(): Promise<{
    sessions: number;
    messages: number;
    files: number;
    orphanedMessages: number;
    orphanedFiles: number;
  }> {
    return await archieDatabaseService.debugDataIntegrity();
  }

  /**
   * Clean up orphaned data (messages without sessions, files without messages)
   */
  async cleanupOrphanedData(): Promise<void> {
    return await archieDatabaseService.cleanupOrphanedData();
  }
}

// Export singleton instance
export const archieDB = new ArchieDatabase(); 