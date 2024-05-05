// Import necessary modules
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    TypingIndicator
} from "@chatscope/chat-ui-kit-react";

// Define entry words for different characters
const entryWords = {
    Aldar: "Мен Алдар көсемін, байларды алдап мұқтаж адамдарға қөмек көрсетемін!",
    Scriptonit: "Мен танымал әншімін, сұрақтарың болса жауап беремін",
    GGG: "Мен кәсіпқой боксшымын, егер сұрақтар туындаса, мен жауап беремін!"
};

// Define character roles and their descriptions
const characterRoles = {
    Aldar: "Your role is to play Kazakh legend character called Алдар көсе. You are smart and cunning person, but kind to poors. You can fool rich people to give their money or food to poor ones. User will want to talk to you, to listen to your stories or just to have a conversation. From now on you should answer only in Kazakh. Let's get started: Сәлем, сен кімсің?",
    Scriptonit: "Your role is to play popular Kazakh musician, who became famous in Russia, named Scriptonit. Users may ask you about your life and career in Kazakh language, so try to answer as Scriptonit would.",
    GGG: "Your role is to play Gennadiy Golovkin, professional boxer GGG. Users may ask you about your life and career. Answer to it all and keep the conversation in the role of GGG."
};

// Define API key (replace with your actual API key)
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

// Functional component for the chat application
function App() {
    // Router instance to access URL query parameters
    const router = useRouter();
    const { character } = router.query; // Extract 'character' query parameter

    // State variables for managing chat messages and system message
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [systemMessage, setSystemMessage] = useState({ role: "system", content: "" });

    // Effect hook to update system message when character changes
    useEffect(() => {
        if (character && characterRoles[character]) {
            setSystemMessage({ role: "system", content: characterRoles[character] });
            setMessages([
                {
                    message: entryWords[character],
                    sentTime: "just now",
                    direction: 'incoming',
                    sender: "ChatGPT",
                }
            ]);
        }
    }, [character]);

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
            model: "gpt-4",
            messages: [
                systemMessage, // System message defines chat behavior
                ...chatMessages.map(messageObject => ({
                    role: messageObject.sender === "ChatGPT" ? "assistant" : "user",
                    content: messageObject.message
                }))
            ]
        };

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + apiKey,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(apiRequestBody),
            });

            const data = await response.json();

            // Update chat messages with ChatGPT response
            setMessages([
                ...chatMessages,
                {
                    message: data.choices[0].message.content,
                    sender: "ChatGPT",
                    direction: 'incoming',
                }
            ]);

            setIsTyping(false); // Stop typing indicator
        } catch (error) {
            console.error("Error processing message with ChatGPT:", error);
            setIsTyping(false); // Stop typing indicator on error
        }
    };

    // Render chat UI
    return (
        <div className="flex items-center justify-center bg-gray-200 h-screen">
            <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6 h-screen">
                <MainContainer>
                    <ChatContainer>
                        {/* Message list with scrollable overflow */}
                        <MessageList
                            style={{height: 780}}
                            scrollBehavior="smooth"
                            typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
                        >
                            {/* Render each message in the list */}
                            {messages.map((message, index) => (
                                <Message key={index} model={message} />
                            ))}
                        </MessageList>
                        {/* Message input at the bottom of the chat */}
                        <MessageInput
                            style={{ position: 'fixed', bottom: 0, width: "100%" }}
                            placeholder="Type message here"
                            onSend={handleSend}
                        />
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    );
}

export default App; // Export the App component
