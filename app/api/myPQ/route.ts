import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json(

        [
            {
                "ticketId": 3,
                "ticketUrl": "https://cdn.newspenguin.com/news/photo/201912/877_1419_234.jpg",
                "title": "출춘식",
                "formattedDate": "2024/08/26",
                "categoryName": "전시회",
                "backgroundImageUrl": "https://chunsik-dev.s3.ap-northeast-2.amazonaws.com/generate/d3e92fa1-9cbe-47a0-9f6d-32645b8e1e94.jpg"
            },
            {
                "ticketId": 1,
                "ticketUrl": "https://chunsik-dev.s3.ap-northeast-2.amazonaws.com/ticket/c4de856b-15a4-4c50-bb33-9c044d194f05.jpg",
                "title": "출출한춘식이",
                "formattedDate": "2024/08/23",
                "categoryName": "전시회",
                "backgroundImageUrl": "https://chunsik-dev.s3.ap-northeast-2.amazonaws.com/generate/22824be2-d341-4839-a598-fb861741883d.jpg"
            },
            {
                "ticketId": 2,
                "ticketUrl": "https://chunsik-dev.s3.ap-northeast-2.amazonaws.com/ticket/test2.jpg",
                "title": "23",
                "formattedDate": "2024/07/11",
                "categoryName": "콘서트",
                "backgroundImageUrl": "https://chunsik-dev.s3.ap-northeast-2.amazonaws.com/generate/dee4a1a2-2562-4f60-b8fa-b44c36d01cff.jpg"
            }
        ]
        
    );
}