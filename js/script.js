
const input = document.getElementById('mensagem');
const btn = document.getElementById('btnEnviar');
const list = document.getElementById('Lista');

function createListItem(word) {
  const li = document.createElement('li');

  const span = document.createElement('span');
  span.className = 'text';
  span.textContent = word;

  const editBtn = document.createElement('button');
  editBtn.type = 'button';
  editBtn.className = 'edit';
  editBtn.textContent = 'Editar';

  const delBtn = document.createElement('button');
  delBtn.type = 'button';
  delBtn.className = 'delete';
  delBtn.textContent = 'Excluir';

  li.append(span, editBtn, delBtn);
  return li;
}

function addWords() {
  const text = input.value.trim();
  if (!text) return;
  const words = text.split(/\s+/).filter(Boolean);
  words.forEach(w => list.appendChild(createListItem(w)));
  input.value = '';
  input.focus();
}

btn.addEventListener('click', addWords);
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addWords();
});




list.addEventListener('click', (e) => {
  const target = e.target;
  const li = target.closest('li');
  if (!li) return;

 
  if (target.classList.contains('delete')) {
    li.remove();
    return;
  }

  if (target.classList.contains('edit') || target.classList.contains('saving')) {
    const isSaving = target.classList.contains('saving');
    if (isSaving) {
      const editInput = li.querySelector('input');
      const newText = editInput ? editInput.value.trim() : '';
      const span = document.createElement('span');
      span.className = 'text';
      span.textContent = newText || '(vazio)';
      if (editInput) li.replaceChild(span, editInput);
      target.textContent = 'Editar';
      target.classList.remove('saving');
    } else {
      const span = li.querySelector('.text');
      const editInput = document.createElement('input');
      editInput.type = 'text';
      editInput.value = span.textContent === '(vazio)' ? '' : span.textContent;
      li.replaceChild(editInput, span);
      editInput.focus();
      target.textContent = 'Salvar';
      target.classList.add('saving');
    }
  }
});

list.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  const editInput = e.target;
  if (editInput && editInput.tagName === 'INPUT') {
    const li = editInput.closest('li');
    const saveBtn = li.querySelector('.edit.saving');
    if (saveBtn) saveBtn.click(); 
  }
});
