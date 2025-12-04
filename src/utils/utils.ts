type FetchPayloadType = {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

export const apiRequest = async (route: string, payload: FetchPayloadType) => {
  const finalPayload: RequestInit = {
    method: payload.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(payload.headers || {})
    },
    body: payload.body
  };

  try {
    const res = await fetch(route, finalPayload);

    // DEBUG LOG: show raw text first
    const text = await res.text();
    console.log('Raw response for', route, ':', text);

    // try parsing JSON if possible
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error('Failed to parse JSON:', e);
      return { message: 'Invalid JSON response' };
    }

  } catch (err) {
    console.error('Network error:', err);
    return { message: 'Network error' };
  }
}



export const daysAgoLabel = function (isoString: string | undefined): string {
    if(!isoString){
        return 'unknown'
    }
    const inputDate = new Date(isoString);
    const today = new Date();

    // Normalize to midnight to compare by full days only
    const oneDay = 1000 * 60 * 60 * 24;
    const startOfDay = (d: Date): Date =>
        new Date(d.getFullYear(), d.getMonth(), d.getDate());

    const diffDays = Math.floor(
        (startOfDay(today).getTime() - startOfDay(inputDate).getTime()) / oneDay
    );

    if (diffDays === 0) return "today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays > 1) return `${diffDays} days ago`;
    return "in the future"; // optional handling
}

export const readableDate = function (input?: string | Date): string {
    if (!input) return "unknown date"; // handles undefined/null

    const date = new Date(input);
    if (isNaN(date.getTime())) return "invalid date"; // handles bad input

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };

    return date.toLocaleDateString(undefined, options);
}