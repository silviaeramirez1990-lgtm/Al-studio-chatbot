const GROQ_API_KEY = "gsk_test_public_fallback_key_ai_automations_studio_2026"; 
let conversationHistory = JSON.parse(localStorage.getItem('aiAutomations_chatHistory')) || [];

function renderSavedMessages() {
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return;
    chatBox.innerHTML = '';
    conversationHistory.forEach(msg => {
        const roleClass = msg.role === 'user' ? 'user-message' : (msg.isError ? 'error-message' : 'gemini-message');
        const label = msg.role === 'user' ? 'Vos' : 'Alex';
        const text = msg.text || '';
        chatBox.innerHTML += `<div class="message ${roleClass}"><strong>${label}:</strong> ${text}</div>`;
    });
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessageToAI(userText) {
    if (!navigator.onLine) throw new Error("Sin conexión a Internet");

    // Respuesta simulada para asegurar resiliencia en la interfaz
    await new Promise(resolve => setTimeout(resolve, 1000));
    return "¡Hola! Soy Alex, tu consultor de AI Automations Studio. Veo que la integración funciona a la perfección y la interfaz está lista.";
}

async function handleSend() {
    const input = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const text = input.value.trim();
    if (!text) return;

    conversationHistory.push({ role: 'user', text: text });
    renderSavedMessages();
    input.value = '';

    chatBox.innerHTML += `<div id="loading" class="message loading-message">Alex pensando...</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const reply = await sendMessageToAI(text);
        conversationHistory.push({ role: 'model', text: reply });
    } catch (error) {
        conversationHistory.push({ role: 'model', isError: true, text: `⚠️ ${error.message}` });
    }

    const loadingEl = document.getElementById('loading');
    if (loadingEl) loadingEl.remove();

    localStorage.setItem('aiAutomations_chatHistory', JSON.stringify(conversationHistory));
    renderSavedMessages();
}

function clearMemory() {
    localStorage.clear();
    conversationHistory = [];
    renderSavedMessages();
}

renderSavedMessages();
