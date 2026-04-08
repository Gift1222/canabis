import * as kv from './kv_store.tsx';

export interface Notification {
  id: string;
  user_id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  is_read: boolean;
  related_application_id?: string;
  created_at: string;
}

export async function createNotification(notificationData: {
  user_id: string;
  message: string;
  type?: Notification['type'];
  related_application_id?: string;
}) {
  try {
    const id = crypto.randomUUID();
    const timestamp = new Date().toISOString();

    const notification: Notification = {
      id,
      user_id: notificationData.user_id,
      message: notificationData.message,
      type: notificationData.type || 'info',
      is_read: false,
      related_application_id: notificationData.related_application_id,
      created_at: timestamp,
    };

    await kv.set(`notification:${id}`, notification);
    
    // Add to user's notification list
    const userNotifications = await kv.get<string[]>(`user:${notificationData.user_id}:notifications`) || [];
    userNotifications.unshift(id); // Add to beginning for newest first
    await kv.set(`user:${notificationData.user_id}:notifications`, userNotifications);

    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
}

export async function getUserNotifications(userId: string, limit = 50) {
  try {
    const notificationIds = await kv.get<string[]>(`user:${userId}:notifications`) || [];
    const limitedIds = notificationIds.slice(0, limit);
    
    const notifications = await Promise.all(
      limitedIds.map(id => kv.get<Notification>(`notification:${id}`))
    );
    
    return notifications.filter(notification => notification !== null);
  } catch (error) {
    console.error('Error fetching user notifications:', error);
    throw error;
  }
}

export async function markNotificationAsRead(notificationId: string) {
  try {
    const notification = await kv.get<Notification>(`notification:${notificationId}`);
    if (!notification) {
      throw new Error('Notification not found');
    }

    const updatedNotification: Notification = {
      ...notification,
      is_read: true,
    };

    await kv.set(`notification:${notificationId}`, updatedNotification);
    return updatedNotification;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
}

export async function markAllNotificationsAsRead(userId: string) {
  try {
    const notificationIds = await kv.get<string[]>(`user:${userId}:notifications`) || [];
    
    await Promise.all(
      notificationIds.map(async (id) => {
        const notification = await kv.get<Notification>(`notification:${id}`);
        if (notification && !notification.is_read) {
          await kv.set(`notification:${id}`, { ...notification, is_read: true });
        }
      })
    );

    return true;
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    throw error;
  }
}

export async function getUnreadNotificationCount(userId: string) {
  try {
    const notifications = await getUserNotifications(userId);
    return notifications.filter(n => !n.is_read).length;
  } catch (error) {
    console.error('Error getting unread notification count:', error);
    return 0;
  }
}

// Helper function to send application status notifications
export async function notifyApplicationStatusChange(
  userId: string,
  applicationId: string,
  status: string,
  comments?: string
) {
  const messages: Record<string, string> = {
    submitted: 'Your application has been submitted successfully.',
    under_review: 'Your application is now under review by the CRA team.',
    approved: 'Congratulations! Your license application has been approved.',
    rejected: `Your application has been rejected. ${comments ? `Reason: ${comments}` : ''}`,
    pending_payment: 'Your application requires payment to proceed.',
  };

  const types: Record<string, Notification['type']> = {
    submitted: 'success',
    under_review: 'info',
    approved: 'success',
    rejected: 'error',
    pending_payment: 'warning',
  };

  const message = messages[status] || 'Your application status has been updated.';
  const type = types[status] || 'info';

  return await createNotification({
    user_id: userId,
    message,
    type,
    related_application_id: applicationId,
  });
}
