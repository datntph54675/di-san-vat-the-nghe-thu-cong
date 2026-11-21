import React, { useState, useEffect } from 'react';
import { Craft, ArtisanStory, ReferenceSource, MediaItem, AIDraft, UserRole } from './types/heritage';
import { HeritageService } from './services/heritageService';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { CraftsView } from './views/CraftsView';
import { CraftDetailView } from './views/CraftDetailView';
import { MapView } from './views/MapView';
import { StoriesView } from './views/StoriesView';
import { MediaView } from './views/MediaView';
import { ReferencesView } from './views/ReferencesView';
import { AIStudioView } from './views/AIStudioView';
import { AdminView } from './views/AdminView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [previousTab, setPreviousTab] = useState<string>('home');
  const [userRole, setUserRole] = useState<UserRole>('visitor');

  // Datasets
  const [crafts, setCrafts] = useState<Craft[]>([]);
  const [references, setReferences] = useState<ReferenceSource[]>([]);
  const [stories, setStories] = useState<ArtisanStory[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [drafts, setDrafts] = useState<AIDraft[]>([]);

  // Navigation targets
  const [selectedCraft, setSelectedCraft] = useState<Craft | null>(null);
  const [selectedMediaItem, setSelectedMediaItem] = useState<MediaItem | null>(null);
  const [selectedRefIdForAI, setSelectedRefIdForAI] = useState<string | undefined>(undefined);

  const refreshAllData = () => {
    setCrafts(HeritageService.getCrafts());
    setReferences(HeritageService.getReferences());
    setStories(HeritageService.getStories());
    setMedia(HeritageService.getMedia());
    setDrafts(HeritageService.getAIDrafts());
    setUserRole(HeritageService.getCurrentRole());
  };

  useEffect(() => {
    refreshAllData();
  }, []);

  const handleSelectTab = (tab: string) => {
    setPreviousTab(currentTab === 'craft-detail' ? previousTab : currentTab);
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCraft = (craft: Craft) => {
    setSelectedCraft(craft);
    setPreviousTab(currentTab);
    setCurrentTab('craft-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromCraftDetail = () => {
    setCurrentTab(previousTab === 'craft-detail' ? 'crafts' : previousTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChangeRole = (role: UserRole) => {
    HeritageService.setCurrentRole(role);
    setUserRole(role);
  };

  const handleSelectStory = (story: ArtisanStory) => {
    setCurrentTab('stories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectReference = (ref: ReferenceSource) => {
    setCurrentTab('references');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F0E6] text-[#211E1B]">
      {/* Universal Top Bar */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        userRole={userRole}
        onChangeRole={handleChangeRole}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            crafts={crafts}
            stories={stories}
            references={references}
            media={media}
            onSelectCraft={handleSelectCraft}
            onSelectStory={handleSelectStory}
            onNavigate={handleSelectTab}
            onOpenMediaModal={(item) => setSelectedMediaItem(item)}
          />
        )}

        {currentTab === 'crafts' && (
          <CraftsView
            crafts={crafts}
            onSelectCraft={handleSelectCraft}
          />
        )}

        {currentTab === 'craft-detail' && selectedCraft && (
          <CraftDetailView
            craft={selectedCraft}
            references={references}
            onBack={handleBackFromCraftDetail}
            onSelectReference={handleSelectReference}
          />
        )}

        {currentTab === 'map' && (
          <MapView
            crafts={crafts}
            onSelectCraft={handleSelectCraft}
          />
        )}

        {currentTab === 'stories' && (
          <StoriesView
            stories={stories}
            crafts={crafts}
            onSelectCraft={handleSelectCraft}
          />
        )}

        {currentTab === 'media' && (
          <MediaView
            media={media}
            activeModalItem={selectedMediaItem}
            onOpenModal={(item) => setSelectedMediaItem(item)}
            onCloseModal={() => setSelectedMediaItem(null)}
          />
        )}

        {currentTab === 'references' && (
          <ReferencesView
            references={references}
            crafts={crafts}
            onSelectCraft={handleSelectCraft}
            onUseInAIStudio={(ref) => {
              setSelectedRefIdForAI(ref.id);
              setCurrentTab('ai-studio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'ai-studio' && (
          <AIStudioView
            references={references}
            drafts={drafts}
            initialSelectedRefId={selectedRefIdForAI}
            onDraftSaved={(_newDraft) => {
              setDrafts(HeritageService.getAIDrafts());
            }}
            onNavigateToAdmin={() => setCurrentTab('admin')}
          />
        )}

        {currentTab === 'admin' && (
          <AdminView
            userRole={userRole}
            crafts={crafts}
            references={references}
            stories={stories}
            drafts={drafts}
            onChangeRole={handleChangeRole}
            onRefreshData={refreshAllData}
            onSelectCraft={handleSelectCraft}
          />
        )}
      </main>

      {/* Scholarly Museum Footer */}
      <Footer onSelectTab={handleSelectTab} />
    </div>
  );
}
