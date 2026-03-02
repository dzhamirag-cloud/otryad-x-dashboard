#!/bin/bash
OUTPUT="/Users/dzamal/.openclaw/workspace/agents-dashboard/tasks.json"

python3 << 'PYTHON'
import json, os, glob
from datetime import datetime

agents_config = {
    "main": {"name": "Кайро", "emoji": "🤖"},
    "marketer": {"name": "Марк", "emoji": "📈"},
    "brandman": {"name": "Бренд", "emoji": "🎯"},
    "cfo": {"name": "Фин", "emoji": "💰"},
    "techlead": {"name": "Текна", "emoji": "⚙️"},
    "strategist": {"name": "Прайм", "emoji": "🧠"},
}

tasks = []

for agent_id, cfg in agents_config.items():
    session_dir = os.path.expanduser(f"~/.openclaw/agents/{agent_id}/sessions/")
    session_files = glob.glob(os.path.join(session_dir, "*.jsonl"))
    
    for sf in sorted(session_files, key=os.path.getmtime, reverse=True)[:2]:  # Last 2 sessions
        try:
            with open(sf, 'r') as f:
                messages = []
                for line in f:
                    try:
                        msg = json.loads(line)
                        messages.append(msg)
                    except:
                        pass
                
                # Extract assistant messages with content
                for msg in reversed(messages[-50:]):  # Last 50 messages
                    if msg.get('type') == 'message':
                        m = msg.get('message', {})
                        if m.get('role') == 'assistant':
                            content = m.get('content', [])
                            text_parts = []
                            
                            for part in content:
                                if isinstance(part, dict) and part.get('type') == 'text':
                                    text_parts.append(part.get('text', ''))
                            
                            full_text = ' '.join(text_parts).strip()
                            
                            if full_text and len(full_text) > 20:
                                timestamp = msg.get('timestamp')
                                if timestamp:
                                    try:
                                        dt = datetime.fromisoformat(timestamp.replace('Z', '+00:00'))
                                        tasks.append({
                                            'agent': cfg['name'],
                                            'emoji': cfg['emoji'],
                                            'time': dt.strftime('%Y-%m-%d %H:%M'),
                                            'text': full_text[:200] + ('...' if len(full_text) > 200 else ''),
                                            'timestamp': dt.timestamp()
                                        })
                                    except:
                                        pass
        except Exception as e:
            pass

# Sort by timestamp, newest first
tasks.sort(key=lambda x: x['timestamp'], reverse=True)

# Take last 50 tasks
tasks = tasks[:50]

# Remove timestamp for output
for task in tasks:
    del task['timestamp']

output = {
    "updatedAt": datetime.now().isoformat(),
    "tasks": tasks
}

with open("/Users/dzamal/.openclaw/workspace/agents-dashboard/tasks.json", 'w') as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print(f"Generated {len(tasks)} tasks")
PYTHON
