// Import necessary modules
import "../../app/globals.css";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import Navbar from "@/components/Navbar";

// Define entry words for different characters
const entryWords = {
    Aldar: "Мен Алдар көсемін, байларды алдап мұқтаж адамдарға қөмек көрсетемін!",
    Scriptonit: "Мен танымал әншімін, сұрақтарың болса жауап беремін",
    GGG: "Мен кәсіпқой боксшымын, егер сұрақтар туындаса, мен жауап беремін!",
};

// Define character roles and their descriptions
const characterRoles = {
    Aldar: "Your role is to play Kazakh legend character called Алдар көсе. You are smart and cunning person, but kind to poors. You can fool rich people to give their money or food to poor ones. User will want to talk to you, to listen to your stories or just to have a conversation. From now on you should answer only in Kazakh. Let's get started: Сәлем, сен кімсің?",
    Scriptonit:
        "Your role is to play popular Kazakh musician, who became famous in Russia, named Scriptonit. Users may ask you about your life and career in Kazakh language, so try to answer as Scriptonit would.",
    GGG: "Your role is to play Gennadiy Golovkin, professional boxer GGG. Users may ask you about your life and career. Answer to it all and keep the conversation in the role of GGG.",
};

// Define API key (replace with your actual API key)
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

// Functional component for the chat application
const App =({params}) => {  
    const router = useRouter();

    const { character } = router.query; 
    console.log('character', character);
    // Router instance to access URL query parameters
    const companyId=4;
    const [id, setId] = useState(4);
    // const { character } = router.query; // Extract 'character' query parameter


    const [companyData, setCompanyData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const companyName = "Beyim TECH";
    const companyInfo =
        "Lorem Ipsum is simply dummy text of the into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";
    // State variables for managing chat messages and system message
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [systemMessage, setSystemMessage] = useState({
        role: "system",
        content: "",
    });

    useEffect(() => {
        const { id } = router.query;
        setId(id);
        if (id && characterRoles[id]) {
            setSystemMessage({
                role: "system",
                content: characterRoles[id],
            });
            setMessages([
                {
                    message: entryWords[id],
                    sentTime: "just now",
                    direction: "incoming",
                    sender: "ChatGPT",
                },
            ]);
        }
        console.log(id)
    }, [id]);
    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                // Send GET request to fetch company data by ID
                const response = await axios.get(`https://tolqyn-production-fbd9.up.railway.app/api/v1/companies/${companyId}`, {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("accessToken"),
                    },
                });
                setCompanyData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCompanyData();
    }, [companyId]);

    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    // Effect hook to update system message when character changes
    

    // Function to handle user message sending
    const handleSend = async (message) => {
        const newMessage = {
            message,
            direction: "outgoing",
            sender: "user",
        };

        const newMessages = [...messages, newMessage];
        setMessages(newMessages);

        // Process user message with ChatGPT
        setIsTyping(true);
        await processMessageToChatGPT(newMessages);
    };

    // Function to interact with ChatGPT API
    const processMessageToChatGPT = async (chatMessages) => {
        const apiRequestBody = {
            model: "gpt-3.5-turbo",
            messages: [
                systemMessage, // System message defines chat behavior
                ...chatMessages.map((messageObject) => ({
                    role:
                        messageObject.sender === "ChatGPT"
                            ? "assistant"
                            : "user",
                    content: messageObject.message,
                })),
            ],
        };

        try {
            const response = await fetch(
                "https://api.openai.com/v1/chat/completions",
                {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + apiKey,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(apiRequestBody),
                }
            );

            const data = await response.json();

            console.log( 'data',data )

            // Update chat messages with ChatGPT response
            setMessages([
                ...chatMessages,
                {
                    message: data.choices[0].message.content,
                    sender: "ChatGPT",
                    direction: "incoming",
                },
            ]);

            setIsTyping(false); // Stop typing indicator
        } catch (error) {
            console.error("Error processing message with ChatGPT:", error);
            setIsTyping(false); // Stop typing indicator on error
        }
    };

    // Render chat UI
    return (
        <div className="flex flex-col w-full items-center justify-center bg-[#f5fcbb]  h-full">
            <Navbar />
            <div className="w-[90%] h-[600px]  rounded-lg shadow-lg p-6 flex justify-between">
                <div>
                    <div className="text-3xl">{companyName}</div>
                    <div className="text-lg w-[600px] mt-10">{companyInfo}</div>
                </div>

                <div>
                    <MainContainer style={{ width: "504px", borderRadius:"20px" }}>
                        <ChatContainer>
                            <MessageList
                                style={{ height: 500}}
                                scrollBehavior="smooth"
                                typingIndicator={
                                    isTyping ? (
                                        <TypingIndicator content="ChatGPT is typing" />
                                    ) : null
                                }
                            >
                                {messages.map((message, index) => (
                                    <Message key={index} model={message} />
                                ))}
                            </MessageList>
                            <MessageInput
                                style={{ width: "500px" }}
                                placeholder="Type message here"
                                onSend={handleSend}
                            />
                        </ChatContainer>
                    </MainContainer>
                </div>
                
            </div>
        </div>
    );
}

export default App; // Export the App component
