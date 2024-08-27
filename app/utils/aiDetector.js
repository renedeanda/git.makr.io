export function detectAIProject(repo) {
  const aiKeywords = ['ai', 'artificial intelligence', 'machine learning', 'deep learning', 'neural network', 'nlp', 'computer vision'];
  const aiFileTypes = ['.ipynb', '.h5', '.pkl', '.onnx', '.pb', '.pt', '.pth'];
  const aiFrameworks = ['tensorflow', 'pytorch', 'keras', 'scikit-learn', 'hugging face', 'openai', 'fastai', 'opencv'];

  const name = repo.name.toLowerCase();
  const description = repo.description ? repo.description.toLowerCase() : '';
  const topics = repo.topics ? repo.topics.map(t => t.toLowerCase()) : [];

  const hasAIKeyword = aiKeywords.some(keyword => 
    name.includes(keyword) || description.includes(keyword) || topics.includes(keyword)
  );

  const hasAIFile = repo.files ? repo.files.some(file => 
    aiFileTypes.some(type => file.name.toLowerCase().endsWith(type))
  ) : false;

  const detectedFrameworks = aiFrameworks.filter(framework => 
    name.includes(framework) || description.includes(framework) || topics.includes(framework)
  );

  return {
    isAIProject: hasAIKeyword || hasAIFile || detectedFrameworks.length > 0,
    frameworks: detectedFrameworks,
  };
}