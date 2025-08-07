/**
 * Archie Background Service
 * Manages Archie's background operation state and provides utilities
 */

import { notificationService } from './notificationService';

class ArchieBackgroundService {
  private isBackgroundMode = false;
  private backgroundActivityCount = 0;
  private listeners: Array<(isBackground: boolean) => void> = [];
  private persistentNotificationId: string | null = null;

  /**
   * Check if Archie is currently running in background mode
   */
  isInBackground(): boolean {
    return this.isBackgroundMode;
  }

  /**
   * Set Archie's background mode status
   */
  setBackgroundMode(isBackground: boolean): void {
    if (this.isBackgroundMode !== isBackground) {
      this.isBackgroundMode = isBackground;
      this.notifyListeners();
      
      if (isBackground) {
        console.log('🔄 Archie is now running in background mode');
        this.createPersistentNotification();
      } else {
        console.log('👁️ Archie is now in foreground mode');
        this.removePersistentNotification();
      }
    }
  }

  /**
   * Create a persistent notification for Archie background service
   */
  private createPersistentNotification(): void {
    // Remove existing notification if any
    this.removePersistentNotification();
    
    // Create new persistent notification
    this.persistentNotificationId = notificationService.addNotification({
      type: 'info',
      title: 'Archie Assistant Active',
      message: 'Archie is running in the background and ready to assist you.',
      duration: undefined, // Persistent - no auto-dismiss
      sound: false // Don't play sound for background service notification
    });
    
    console.log('📢 Created persistent background service notification');
  }

  /**
   * Remove the persistent notification when Archie comes to foreground
   */
  private removePersistentNotification(): void {
    if (this.persistentNotificationId) {
      notificationService.removeNotification(this.persistentNotificationId);
      this.persistentNotificationId = null;
      console.log('🗑️ Removed persistent background service notification');
    }
  }

  /**
   * Update the persistent notification with current activity status
   */
  private updatePersistentNotification(): void {
    if (this.persistentNotificationId && this.isBackgroundMode) {
      // Remove old notification and create updated one
      this.removePersistentNotification();
      
      const activityText = this.hasBackgroundActivity() 
        ? `Archie is processing ${this.backgroundActivityCount} background task${this.backgroundActivityCount > 1 ? 's' : ''}.`
        : 'Archie is ready to assist you in the background.';
      
      this.persistentNotificationId = notificationService.addNotification({
        type: 'info',
        title: 'Archie Assistant Active',
        message: activityText,
        duration: undefined, // Persistent - no auto-dismiss
        sound: false // Don't play sound for background service notification
      });
    }
  }

  /**
   * Increment background activity counter (for tracking ongoing operations)
   */
  incrementBackgroundActivity(): void {
    this.backgroundActivityCount++;
    console.log(`📊 Background activity count: ${this.backgroundActivityCount}`);
    this.updatePersistentNotification();
  }

  /**
   * Decrement background activity counter
   */
  decrementBackgroundActivity(): void {
    this.backgroundActivityCount = Math.max(0, this.backgroundActivityCount - 1);
    console.log(`📊 Background activity count: ${this.backgroundActivityCount}`);
    this.updatePersistentNotification();
  }

  /**
   * Track when a background notification is created
   */
  onBackgroundNotificationCreated(): void {
    console.log('📢 Background notification created');
    // Could be used to update UI indicators or track notification history
  }

  /**
   * Get current background activity count
   */
  getBackgroundActivityCount(): number {
    return this.backgroundActivityCount;
  }

  /**
   * Check if there are any ongoing background activities
   */
  hasBackgroundActivity(): boolean {
    return this.backgroundActivityCount > 0;
  }

  /**
   * Subscribe to background mode changes
   */
  onBackgroundModeChange(listener: (isBackground: boolean) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Notify all listeners of background mode changes
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      try {
        listener(this.isBackgroundMode);
      } catch (error) {
        console.error('Error in background mode listener:', error);
      }
    });
  }

  /**
   * Get a summary of Archie's background status
   */
  getStatus(): {
    isBackground: boolean;
    activityCount: number;
    hasActivity: boolean;
  } {
    return {
      isBackground: this.isBackgroundMode,
      activityCount: this.backgroundActivityCount,
      hasActivity: this.hasBackgroundActivity()
    };
  }

  /**
   * Reset all background state (useful for debugging)
   */
  reset(): void {
    this.isBackgroundMode = false;
    this.backgroundActivityCount = 0;
    this.notifyListeners();
    console.log('🔄 Archie background service reset');
  }
}

// Export singleton instance
export const archieBackgroundService = new ArchieBackgroundService();

// Add to window for debugging in development
if (import.meta.env.DEV) {
  (window as any).archieBackgroundService = archieBackgroundService;
} 