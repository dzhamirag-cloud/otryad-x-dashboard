#!/bin/bash
OUTPUT="/Users/dzamal/.openclaw/workspace/agents-dashboard/data.json"

python3 << 'PYTHON'
import json, os, glob
from datetime import datetime

# Pricing per 1M tokens (approximate)
# Claude Opus: $15 input, $75 output → avg ~$45/M
# Claude Sonnet: $3 input, $15 output → avg ~$9/M
COST_PER_TOKEN = {
    "main": 45 / 1_000_000,       # Opus
    "marketer": 9 / 1_000_000,    # Sonnet
    "brandman": 9 / 1_000_000,
    "cfo": 9 / 1_000_000,
    "techlead": 9 / 1_000_000,
    "strategist": 9 / 1_000_000,
}

agents_config = {
    "main": {"name": "Кайро", "role": "Главный координатор", "emoji": "🤖", "color": "#3377ff", "model": "Opus"},
    "marketer": {"name": "Марк", "role": "Маркетолог", "emoji": "📈", "color": "#ff9500", "model": "Sonnet"},
    "brandman": {"name": "Бренд", "role": "Личный бренд", "emoji": "🎯", "color": "#ff375f", "model": "Sonnet"},
    "cfo": {"name": "Фин", "role": "CFO / Финансы", "emoji": "💰", "color": "#ffd60a", "model": "Sonnet"},
    "techlead": {"name": "Текна", "role": "Tech Lead / CTO", "emoji": "⚙️", "color": "#5ac8fa", "model": "Sonnet"},
    "strategist": {"name": "Прайм", "role": "Бизнес-стратег", "emoji": "🧠", "color": "#bf5af2", "model": "Sonnet"},
}

agents = []
for agent_id, cfg in agents_config.items():
    session_dir = os.path.expanduser(f"~/.openclaw/agents/{agent_id}/sessions/")
    session_files = glob.glob(os.path.join(session_dir, "*.jsonl"))
    
    total_tokens = 0
    task_count = 0
    last_activity = None
    last_task = "Ожидает задачу"
    status = "idle"
    first_activity = None
    
    for sf in session_files:
        try:
            size = os.path.getsize(sf)
            mtime = os.path.getmtime(sf)
            ctime = os.path.getctime(sf)
            
            if last_activity is None or mtime > last_activity:
                last_activity = mtime
            if first_activity is None or ctime < first_activity:
                first_activity = ctime
            
            total_tokens += size // 4
            
            with open(sf, 'r') as f:
                for line in f:
                    try:
                        msg = json.loads(line)
                        if msg.get('role') == 'assistant':
                            task_count += 1
                    except:
                        pass
            
            if (datetime.now().timestamp() - mtime) < 300:
                status = "active"
                
        except Exception:
            pass
    
    # Calculate cost
    cost_rate = COST_PER_TOKEN.get(agent_id, 9 / 1_000_000)
    cost_usd = total_tokens * cost_rate
    
    # Calculate uptime (time between first and last activity today)
    uptime_minutes = 0
    if first_activity and last_activity:
        uptime_minutes = int((last_activity - first_activity) / 60)
    
    # Read last task from memory
    memory_dir = os.path.expanduser(f"~/.openclaw/workspace-{agent_id}/memory/") if agent_id != "main" else os.path.expanduser("~/.openclaw/workspace/memory/")
    today = datetime.now().strftime("%Y-%m-%d")
    memory_file = os.path.join(memory_dir, f"{today}.md")
    
    if os.path.exists(memory_file):
        with open(memory_file, 'r') as f:
            lines = f.readlines()
            for line in reversed(lines):
                line = line.strip()
                if line and not line.startswith('#') and len(line) > 5:
                    last_task = line[:60]
                    break
    
    if agent_id == "main":
        last_task = "QR-оплата + кошелёк + координация Отряда X"
    
    agents.append({
        "id": agent_id,
        "name": cfg["name"],
        "role": cfg["role"],
        "emoji": cfg["emoji"],
        "color": cfg["color"],
        "model": cfg["model"],
        "status": status,
        "tokens": total_tokens,
        "tasks": task_count,
        "costUsd": round(cost_usd, 3),
        "uptimeMinutes": uptime_minutes,
        "lastTask": last_task,
        "lastActivity": datetime.fromtimestamp(last_activity).isoformat() if last_activity else None,
    })

total_cost = sum(a["costUsd"] for a in agents)

output = {
    "updatedAt": datetime.now().isoformat(),
    "agents": agents,
    "totals": {
        "agents": len(agents),
        "active": sum(1 for a in agents if a["status"] == "active"),
        "totalTokens": sum(a["tokens"] for a in agents),
        "totalTasks": sum(a["tasks"] for a in agents),
        "totalCostUsd": round(total_cost, 2),
    }
}

with open("/Users/dzamal/.openclaw/workspace/agents-dashboard/data.json", 'w') as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print(json.dumps(output["totals"], ensure_ascii=False))
PYTHON
