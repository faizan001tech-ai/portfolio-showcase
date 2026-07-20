/**
 * URL Sanitizer Utility
 * Ensures all image URLs use HTTPS to prevent mixed content errors
 */

/**
 * Convert HTTP URLs to HTTPS
 * @param {string} url - The URL to sanitize
 * @returns {string} - HTTPS URL
 */
const ensureHttps = (url) => {
  if (!url || typeof url !== 'string') return url;
  
  // If URL starts with http://, convert to https://
  if (url.startsWith('http://')) {
    const httpsUrl = url.replace('http://', 'https://');
    console.log(`🔄 URL Sanitized: ${url} → ${httpsUrl}`);
    return httpsUrl;
  }
  
  return url;
};

/**
 * Sanitize a project object's image URL
 * @param {Object} project - Project document
 * @returns {Object} - Project with sanitized image URL
 */
const sanitizeProject = (project) => {
  if (!project) return project;
  
  const sanitized = { ...project.toObject ? project.toObject() : project };
  
  if (sanitized.image) {
    sanitized.image = ensureHttps(sanitized.image);
  }
  
  return sanitized;
};

/**
 * Sanitize an array of projects
 * @param {Array} projects - Array of project documents
 * @returns {Array} - Array of projects with sanitized image URLs
 */
const sanitizeProjects = (projects) => {
  if (!Array.isArray(projects)) return projects;
  
  return projects.map(project => sanitizeProject(project));
};

/**
 * Middleware to sanitize image URLs in request body
 * Ensures incoming data never contains HTTP URLs
 */
const sanitizeImageUrls = (req, res, next) => {
  if (req.body && req.body.image) {
    req.body.image = ensureHttps(req.body.image);
  }
  next();
};

module.exports = {
  ensureHttps,
  sanitizeProject,
  sanitizeProjects,
  sanitizeImageUrls,
};
