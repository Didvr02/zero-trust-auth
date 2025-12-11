// frontend/js/ui.js
window.showMessage = function(elementId, text, isError) {
    // если кто-то по ошибке передаёт 'usersList', перенаправляем в usersMsg
    const safeId = (elementId === 'usersList') ? 'usersMsg' : elementId;
    const messageDiv = document.getElementById(safeId);
    if (!messageDiv) return;

    messageDiv.textContent = text;
    messageDiv.style.display = 'block';
    messageDiv.style.padding = '8px';
    messageDiv.style.borderRadius = '4px';
    messageDiv.style.marginTop = '8px';

    if (isError) {
        messageDiv.style.backgroundColor = '#f8d7da';
        messageDiv.style.color = '#721c24';
        messageDiv.style.border = '1px solid #f5c6cb';
    } else {
        messageDiv.style.backgroundColor = '#d4edda';
        messageDiv.style.color = '#155724';
        messageDiv.style.border = '1px solid #c3e6cb';
    }
};
