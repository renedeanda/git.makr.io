const API_BASE_URL = 'https://api.github.com';

export async function searchRepositories(query) {
  try {
    const res = await fetch(`${API_BASE_URL}/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        // Add your GitHub Personal Access Token here if you have one
        // 'Authorization': 'token YOUR_PERSONAL_ACCESS_TOKEN'
      }
    });

    if (!res.ok) {
      if (res.status === 403) {
        throw new Error('API rate limit exceeded. Please try again later.');
      }
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return { repositories: data.items, error: null };
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return { repositories: [], error: error.message };
  }
}

export async function getRepositoryDetails(owner, repo) {
  try {
    const res = await fetch(`${API_BASE_URL}/repos/${owner}/${repo}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        // Add your GitHub Personal Access Token here if you have one
        // 'Authorization': 'token YOUR_PERSONAL_ACCESS_TOKEN'
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch repository details: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return { repository: data, error: null };
  } catch (error) {
    console.error('Error fetching repository details:', error);
    return { repository: null, error: error.message };
  }
}