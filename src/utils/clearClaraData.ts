import { archieDB } from '../db/archieDatabase';

/**
 * Utility to clear all Archie chat data
 * This will permanently delete all chat sessions, messages, and files
 */
export async function clearAllArchieData(): Promise<boolean> {
  try {
    // Get current stats before clearing
    const stats = await archieDB.getArchieStorageStats();
    
    console.log('Current Archie data:', stats);
    
    // Clear IndexedDB Archie data
    await archieDB.clearAllArchieSessions();
    
    // Clear localStorage Archie data
    const archieKeys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (
        key.includes('archie') || 
        key.includes('Archie') ||
        key === 'archie_interpreter_session' ||
        key === 'archie_provider_configs'
      )) {
        archieKeys.push(key);
      }
    }
    
    // Remove all Archie-related localStorage items
    archieKeys.forEach(key => {
      localStorage.removeItem(key);
      console.log(`Removed localStorage item: ${key}`);
    });
    
    // Clear sessionStorage as well
    const archieSessionKeys = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && (
        key.includes('archie') || 
        key.includes('Archie')
      )) {
        archieSessionKeys.push(key);
      }
    }
    
    archieSessionKeys.forEach(key => {
      sessionStorage.removeItem(key);
      console.log(`Removed sessionStorage item: ${key}`);
    });
    
    console.log(`Successfully cleared ${stats.totalSessions} sessions, ${stats.totalMessages} messages, and ${stats.totalFiles} files`);
    console.log(`Cleared ${archieKeys.length} localStorage items and ${archieSessionKeys.length} sessionStorage items`);
    
    return true;
  } catch (error) {
    console.error('Failed to clear Archie data:', error);
    return false;
  }
}

/**
 * Clear Archie data with user confirmation (browser only)
 */
export async function clearArchieDataWithConfirmation(): Promise<boolean> {
  try {
    const stats = await archieDB.getArchieStorageStats();
    
    const confirmMessage = `This will permanently delete:\n` +
                         `• ${stats.totalSessions} chat sessions\n` +
                         `• ${stats.totalMessages} messages\n` +
                         `• ${stats.totalFiles} files\n` +
                         `• All localStorage/sessionStorage Archie data\n\n` +
                         `Are you sure you want to continue?`;

    if (confirm(confirmMessage)) {
      const success = await clearAllArchieData();
      if (success) {
        alert('Archie chat data cleared successfully!\n\nThe page will reload to refresh the UI.');
        // Add a small delay before reload to ensure all operations complete
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        alert('Failed to clear Archie chat data. Check console for details.');
      }
      return success;
    }
    
    return false;
  } catch (error) {
    console.error('Error in clearArchieDataWithConfirmation:', error);
    alert('Error clearing data. Check console for details.');
    return false;
  }
}

/**
 * Emergency clear function - clears everything and forces reload
 * Use this if the normal clear doesn't work
 */
export async function emergencyClearArchieData(): Promise<void> {
  try {
    console.log('🚨 Emergency Archie data clear initiated...');
    
    // Force clear IndexedDB by deleting the entire database
    if (typeof indexedDB !== 'undefined') {
      const deleteRequest = indexedDB.deleteDatabase('archie_db');
      deleteRequest.onsuccess = () => console.log('IndexedDB archie_db deleted');
      deleteRequest.onerror = () => console.log('Failed to delete IndexedDB archie_db');
    }
    
    // Clear all localStorage
    localStorage.clear();
    console.log('localStorage cleared');
    
    // Clear all sessionStorage
    sessionStorage.clear();
    console.log('sessionStorage cleared');
    
    alert('Emergency clear completed. The page will reload.');
    window.location.reload();
    
  } catch (error) {
    console.error('Emergency clear failed:', error);
    alert('Emergency clear failed. Try manually refreshing the page.');
  }
}

// Make it available globally for easy access from browser console
if (typeof window !== 'undefined') {
  (window as any).clearArchieData = clearArchieDataWithConfirmation;
  (window as any).clearArchieDataNow = clearAllArchieData;
  (window as any).emergencyClearArchie = emergencyClearArchieData;
} 