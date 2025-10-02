import requests
import json
import os

def fetch_github_repos():
    url = "https://api.github.com/users/Aedann/repos"
    response = requests.get(url)
    response.raise_for_status()  # Raise an exception for bad status codes
    return response.json()

def get_readme_path(repo_name):
    # Assuming READMEs are stored in /data/readmes/ with the repo name
    return f"/data/readmes/{repo_name.lower()}.md"

def create_repos_info():
    repos = fetch_github_repos()
    repos_info = []

    for repo in repos:
        repo_info = {
            "titre": repo["name"],
            "topics": repo["topics"],
            "languages": repo["language"],
            "description": repo["description"] or "",  # Handle null description
            "readme": get_readme_path(repo["name"]),
            "lien": repo["homepage"] or "",  # Handle null homepage
            "github": repo["html_url"]
        }
        repos_info.append(repo_info)

    # Write to reposInfo.json
    with open("reposInfo.json", "w", encoding="utf-8") as f:
        json.dump(repos_info, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    create_repos_info()