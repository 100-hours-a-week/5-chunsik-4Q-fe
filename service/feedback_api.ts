const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const feedbackSubmit = async (feedbackData: any) => {
    try {
        const response = await fetch(`${BASE_URL}/feedback`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(feedbackData),
        });

        if (!response.ok) {
            throw new Error("Failed to submit feedback");
        }
        return { success: true };  
        // const data = await response.json();
        // console.log(data);
        // return data;
    } catch (error) {
        console.error("Error submitting feedback:", error);
        throw error;
    }
};