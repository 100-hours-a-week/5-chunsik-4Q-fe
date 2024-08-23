const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getShortenUrl = async (srcUrl: string) => {
    try {
        const response = await fetch(`${BASE_URL}/short`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ srcUrl }),
        });
        if (response.ok) {
            const data = await response.json();
            return data.destUrl;
        } else {
            return srcUrl;
        }
    } catch (error) {
        return srcUrl;
    }
};