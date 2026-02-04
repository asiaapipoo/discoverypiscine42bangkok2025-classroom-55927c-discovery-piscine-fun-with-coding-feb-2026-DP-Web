const ft_list = document.getElementById('ft_list');
const new_btn = document.getElementById('new_btn');

window.onload = () => {
    const cookies = document.cookie.split('; ');
    const todoCookie = cookies.find(row => row.startsWith('todos='));
    if (todoCookie) {
        const todos = JSON.parse(decodeURIComponent(todoCookie.split('=')[1]));
        todos.reverse().forEach(text => addToDOM(text));
    }
};

new_btn.addEventListener('click', () => {
    const task = prompt("เพิ่มรายการใหม่ของคุณ:");
    if (task && task.trim() !== "") {
        addToDOM(task);
        saveTodos();
    }
});

function addToDOM(text) {
    const div = document.createElement('div');
    div.className = 'todo-item';
    div.textContent = text;
    
    div.addEventListener('click', () => {
        if (confirm("คุณต้องการลบรายการนี้ใช่หรือไม่?")) {
            div.remove(); 
            saveTodos();
        }
    });

    ft_list.insertBefore(div, ft_list.firstChild);
}

function saveTodos() {
    const items = Array.from(document.querySelectorAll('.todo-item'))
                       .map(item => item.textContent);
    document.cookie = `todos=${encodeURIComponent(JSON.stringify(items))}; path=/; max-age=31536000`;
}