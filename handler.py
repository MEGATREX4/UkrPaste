import re
import json

# Читання вхідного тексту з файлу
with open("input_pastes.txt", "r", encoding="utf-8") as f:
    input_text = f.read()

# Видаляємо всі рядки з назвою бота і часом (наприклад: "УкрПаста•Сьогодні о 21:00")
input_text = re.sub(r"УкрПаста[^\n]*\n", "", input_text)

# Розділяємо пасти по маркеру "Нова паста додана!"
pastes_raw = input_text.split("Нова паста додана!")

pastes = []

for paste in pastes_raw:
    # Знаходимо автора
    author_match = re.search(r"Автор пасти\s*(.+?)\s*Текст пасти", paste, re.DOTALL)
    # Знаходимо текст пасти
    text_match = re.search(r"Текст пасти\s*(.+)", paste, re.DOTALL)

    if author_match and text_match:
        author = author_match.group(1).strip()
        text = text_match.group(1).strip()
        pastes.append({
            "author": author,
            "text": text
        })

# Записуємо в JSON
with open("new_pastes.json", "w", encoding="utf-8") as f:
    json.dump(pastes, f, ensure_ascii=False, indent=4)

print("✅ Пасти успішно очищено та збережено в new_pastes.json та new_pastes.txt")
