// type WindowWithDataLayer = Window & {
//     dataLayer: Record<string, any>[]
//   }
  
//   declare const window: WindowWithDataLayer
  
//   export const GTM_ID = process.env.NEXT_PUBLIC_GA_ID
  
//   export const pageview = (url: string) => {
//     if (typeof window.dataLayer !== "undefined") {
//       window.dataLayer.push({
//         event: "pageview",
//         page: url,
//       })
//     } else {
//       console.log({
//         event: "pageview",
//         page: url,
//       })
//     }
//   }

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL) => {
  window.gtag('config', GA_TRACKING_ID as string, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (
  action: Gtag.EventNames,
  { event_category, event_label, value }: Gtag.EventParams
) => {
  window.gtag('event', action, {
    event_category,
    event_label,
    value,
  });
};
