/*
 * episodeManager.js
 *
 * Provides simple persistence for generated episodes using the browser’s
 * localStorage.  Episodes are stored as JSON under the key
 * "dualcast_episodes".  You can replace this implementation with calls to a
 * backend database or cloud storage if required.
 */

const STORAGE_KEY = 'dualcast_episodes';

function loadEpisodes() {
  const raw = localStorage.getItem(STORAGE_KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('Failed to parse episodes from storage', e);
    return [];
  }
}

function saveEpisodes(episodes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(episodes));
}

export function saveEpisode(episode) {
  const episodes = loadEpisodes();
  episodes.push(episode);
  saveEpisodes(episodes);
}

export function getEpisodes() {
  return loadEpisodes().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function getEpisodeById(id) {
  return loadEpisodes().find((ep) => ep.id === id);
}

export function deleteEpisode(id) {
  const episodes = loadEpisodes().filter((ep) => ep.id !== id);
  saveEpisodes(episodes);
}