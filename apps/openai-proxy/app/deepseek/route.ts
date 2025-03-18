import OpenAI from "openai";
import { NextResponse, NextRequest } from "next/server";
// import { parse } from 'superjson';

const openai = new OpenAI({
  baseURL: process.env.OPENAI_API_BASE_URL_DS,
  apiKey: process.env.OPENAI_API_KEY_DS,
});

// 内存缓存 存储大的system对象
let messageCache: string = '';
// POST 接口：存储数据
export const POST = async (request: NextRequest) => {
    try {
        const { message } = await request.json(); // 接收系统信息、消息和唯一标识符
        // console.log("message: ", message);
        // 存储数据
        messageCache = message

        return new NextResponse('Data stored successfully', {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
        });
    } catch (error) {
        return new NextResponse('Failed to store data', {
            status: 500,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
        });
    }
};

export const GET = async (request: NextRequest) => {
    const headers = request.headers;
    const Message = JSON.parse(decodeURIComponent(headers.get("Message") ?? '') ?? '[]'); // 获取 System 头

    const stream = new ReadableStream({
        async start(controller) {

            try {
                console.log("messageCache length: ", messageCache.length);
                const deepseekStream = await openai.chat.completions.create({
                    messages: [
                        {
                            role: "system", content: messageCache ?? ''
                        },
                        ...Message,
                    ],
                    model: "deepseek-chat", // deepseek-reasoner
                    stream: true,
                    stream_options: { include_usage: true },
                });

                messageCache = ''; // 清空缓存

                for await (const chunk of deepseekStream) {
                    const { choices = [], usage } = chunk;
                    if (choices.length === 0 && usage) {
                        console.log("usage", usage);
                        controller.enqueue(`data: ${JSON.stringify("[DONE]")}\n\n`);
                        // controller.close(); // 关闭数据流
                        // closeStream(); // 正确关闭流
                    }

                    if (choices.length > 0) {
                        const content = chunk.choices?.[0]?.delta?.content;
                        if (content) {
                            console.log("content: ", content);
                            // 发送数据到客户端
                            controller?.enqueue(`data: ${JSON.stringify(content)}\n\n`);
                        }
                        if (chunk.choices?.[0]?.finish_reason === "stop") {
                            controller.enqueue(`data: ${JSON.stringify("[DONE]")}\n\n`);
                        }
                    }
                }
                // closeStream(); // 再次确保关闭
                // controller.close(); // 关闭数据流
            } catch (err) {
                console.error("error: ", err);
                // controller.enqueue(`data: ${JSON.stringify("nextjs error")}\n\n`);
                controller.close();
                // closeStream(); // 再次确保关闭
            }
        },
    });

    return new NextResponse(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Access-Control-Allow-Origin": "*", // 允许所有来源
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // 允许的方法
            "Access-Control-Allow-Headers": "Content-Type, Authorization, System, Message",
        },
    });
};

export async function OPTIONS() {
    return new NextResponse(null, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, System, Message",
        },
    });
};
