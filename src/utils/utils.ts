type FetchPayloadType = {
    method?: string
    headers?: {
        'content-type': string
    },
    credentials?: RequestCredentials
    body?: string
}

export const apiRequest = async function(route: string, payload: FetchPayloadType){
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try{
        const res = await fetch(baseUrl + route, payload);
        const data = await res.json();
        console.log('from utils function: ', data)
        return data;
    }catch(error){
        console.log(error);
    };
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