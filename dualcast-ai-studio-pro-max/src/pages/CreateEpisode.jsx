import React from 'react';
import EpisodeForm from '../components/EpisodeForm.jsx';

/**
 * CreateEpisode page renders the episode creation form along with
 * instructions for new users.  It invites the user to specify a topic, tone,
 * length and difficulty before generating an episode.  When the form is
 * submitted the conversation engine produces the script and persists it.
 */
export default function CreateEpisode() {
  return (
    <div>
      <h2 className="section-title">Create Episode</h2>
      <p className="mb-4 text-white/80">
        Choose a topic and customise the tone, length and difficulty. When you
        generate an episode, Nova and Atlas will craft a conversation just for you.
      </p>
      <EpisodeForm />
    </div>
  );
}