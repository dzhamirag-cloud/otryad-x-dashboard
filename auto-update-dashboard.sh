#!/bin/bash
# Auto-update dashboard data and push to GitHub → triggers Vercel redeploy

set -e

DASHBOARD_DIR="/Users/dzamal/.openclaw/workspace/agents-dashboard"
cd "$DASHBOARD_DIR"

# Update data.json
bash update-data.sh >/dev/null 2>&1

# Update tasks.json
bash update-tasks.sh >/dev/null 2>&1

# Check if there are changes
if ! git diff --quiet data.json tasks.json 2>/dev/null; then
  # Commit and push
  git add data.json tasks.json
  git commit -m "Auto-update: $(date '+%Y-%m-%d %H:%M')" >/dev/null 2>&1
  git push origin main >/dev/null 2>&1
  echo "[$(date '+%H:%M:%S')] Dashboard data updated & pushed"
else
  echo "[$(date '+%H:%M:%S')] No changes"
fi
