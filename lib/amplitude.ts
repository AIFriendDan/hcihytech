import { init, track } from '@amplitude/analytics-browser';

const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export function initializeAnalytics() {
  if (!apiKey || typeof window === 'undefined') return;

  init(apiKey, undefined, {
    defaultTracking: {
      pageViews: true,
      sessions: true,
      formInteractions: true,
      fileDownloads: false,
    },
  });
}

export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  if (!apiKey || typeof window === 'undefined') return;

  track(eventName, properties);
}
