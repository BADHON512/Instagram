export const getInstagramReels = async () => {
    try {
        const response = await fetch(
            `https://graph.facebook.com/v19.0/17841445271393251/media?fields=id,media_type,media_url,caption,thumbnail_url,permalink,timestamp&access_token=IGAASrP3jlqd9BZAE5yNEh1VUMzVXM4b2VTUVhpQ0lrVHV3Ql8yX2g1elBWR3lUcnBYUWtzbGhYMGZAjSGhjdGhKNnJ1Y1dMdmtTV1lFZA3J4T2pBOWlOa24zS2pOVVFrSVZAwT0ZAsUUJ2NUs5Y19uaXM1OVFJZAFBpY2lnV3NuMXBrMAZDZD`
          );
  
  
      const data = await response.json();
      
      // Filter only reels (video content)
  
  
      return data;
    } catch (error) {
      console.error("Error fetching reels:", error);
     
    }
  };
  