export const emailDefaultText = (siteName: string) => {
  return `Message From ${siteName}`;
};

export const createAccountSubject = (title: string) => {
  return `Thank you for subscribing to ${title}`;
};

export const emailDefaultSubject = (siteName: string) => {
  return `Welcome to ${siteName}`;
};

export const resetPasswordEmailSubject = (siteName: string) => {
  return `${siteName} - Reset your password`;
};

export const renewFailedSubject =
  'Urgent: Action Required to Avoid Service Interruption';

export const cancelSubscriptionSubject = (siteName: string) => {
  return `Important: Cancellation Confirmation for Your Subscription on ${siteName}`;
};
