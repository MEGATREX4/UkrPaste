import re
import json

# Читання вхідного тексту з файлу
with open("input_pastes.txt", "r", encoding="utf-8") as f:
    input_text = f.read()

# Видаляємо всі блоки на кшталт "УкрПаста•..." до кінця рядка або з `[hh:mm]`
input_text = re.sub(r"УкрПаста•[^\n]*", "", input_text)
input_text = re.sub(r"\[\d{1,2}:\d{2}\]", "", input_text)  # видалення часу в дужках типу [2:17]
input_text = re.sub(r"\d{1,2} квітня \d{4} р\.", "", input_text)  # видалення дат
input_text = re.sub(r"БОТ\s*—.*", "", input_text)  # бот-повідомлення
input_text = re.sub(r"УкрПаста\s*БОТ", "", input_text)  # дубльована частина
input_text = re.sub(r"УкрПаста", "", input_text)  # видалення "УкрПаста"
input_text = re.sub(r"\n{2,}", "\n", input_text)  # прибрати зайві пусті рядки

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

# Запис у JSON
with open("new_pastes.json", "w", encoding="utf-8") as f:
    json.dump(pastes, f, ensure_ascii=False, indent=4)

print("✅ Пасти успішно очищено та збережено в new_pastes.json")
