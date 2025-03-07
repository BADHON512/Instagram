import React from 'react'
import HomeReels from './_page'
import { GetUser } from '@/@actions/user/getUser';

type Props = {}
type Reel = {
  id: number;
  videoUrl: string;
  likes: number;
  comments: number;
};
const Page = async(props: Props) => {
const currentUser:any = await GetUser()


const reelsData:Reel[] = [
  {
    id: 0,
    videoUrl: "https://res.cloudinary.com/dfng3w9jm/video/upload/v1741361430/reels%20video/Snapsave.app_AQPdfykrukIhN6MBkf837sIWH9mOLeTQ5USx3Ui8MgaRYos4a80XdF4j6SW4clzygYLlV_BpqbUl636H3pe5MR9H_mwvs0x.mp4",
    likes: 120,
    comments: 30,
  },
  {
    id: 56,
    videoUrl: "https://res.cloudinary.com/dfng3w9jm/video/upload/v1741361422/reels%20video/Snapsave.app_-Iciv6xetLjQoEGvfYKuPExIjhvpQFNzRNqYXpZNLWOJhy_m5lgx1.mp4",
    likes: 120,
    comments: 30,
  },
  {
    id: 26,
    videoUrl: "https://res.cloudinary.com/dfng3w9jm/video/upload/v1741361421/reels%20video/Snapinst.app_video_AQP6bqI1Kbm6ofQ7Zkcn-0-YQPLKjh1OKuXEdpEOipYL_fg_9GInehwjOex1pvRdsdQeyIAZ8C1h7aLoF4pvmoqmKtG0Kmtp0NSfZYA_rtbnoy.mp4",
    likes: 420,
    comments: 30,
  },
  {
    id: 96,
    videoUrl: "https://res.cloudinary.com/dfng3w9jm/video/upload/v1741361439/reels%20video/Snapsave.app_AQN_u3E_HWL5rUypWNqrR8c7m3Vg5IqbiNIGCtjOKXi7gVyq7wDefT9SwRx3K0ItU9YXWmQtnQ_lKOnQC0mlUWW7_maffzm.mp4",
    likes: 320,
    comments: 30,
  },
  {
    id: 16,
    videoUrl: "https://res.cloudinary.com/dfng3w9jm/video/upload/v1741361442/reels%20video/Snapsave.app_-G1cU92d6eyL95pkNkUKMsfq4P5HNaFkAGU54vwjAdZE_oykryz.mp4",
    likes: 520,
    comments: 30,
  },
  {
    id: 36,
    videoUrl: "https://res.cloudinary.com/dfng3w9jm/video/upload/v1741361423/reels%20video/Snapsave.app_-IURCtFrq7DAz5ZD_qaowhr.mp4",
    likes: 160,
    comments: 30,
  },
  {
    id: 76,
    videoUrl: "https://res.cloudinary.com/dfng3w9jm/video/upload/v1741361422/reels%20video/Snapsave.app_-_F1UaP1P_h9ggbs.mp4",
    likes: 320,
    comments: 30,
  },

  {
    id: 1,
    videoUrl: "https://res.cloudinary.com/dfng3w9jm/video/upload/v1738419061/reels%20video/AQNt_GW4sHTDHGKJs1kxdkTISQ06v0hLX54IJNjZuLf2MLah7NqCURiAaSOe7uBHLTaCaelKoCjzrpHJipVojULUOnmu6Fs-E-wYlb0_kbbwfe.mp4",
    likes: 120,
    comments: 30,
  },
  {
    id: 2,
    videoUrl: "https://res.cloudinary.com/dfng3w9jm/video/upload/v1738419061/reels%20video/One_of_the_greatest_skills_you_can_learn_is_how_to_be_alone..._lanatureshub_losangeles_usa_newyork_dallas_sanfrancisco_canada_california_chicago_sandiego_beach_ocean_florida_america_instadaily_uvrwhs.mp4",
    likes: 48,
    comments: 50,
  },
  {
    id: 3,
    videoUrl: "https://res.cloudinary.com/dfng3w9jm/video/upload/v1738419086/reels%20video/I_used_to_look_at_landscapes_in_movies_and_would_think_to_myself_if_places_like_these_really_exist._When_I_started_traveling_myself_I_found_out_that_places_even_better_than_those_exist._I_saw_locations_never_ever_s_jgxif3.mp4",
    likes: 30,
    comments: 70,
  },
  {
    id: 5,
    videoUrl: "https://res.cloudinary.com/dfng3w9jm/video/upload/v1738419067/reels%20video/Schwende_Switzerland_Follow_for_daily_Swiss_Content_Want_to_know_the_exact_location_of_this_spot_Check_the_link_in_my_bio_Save_this_for_your_trip_to_Switzerland_by-_swisswoow_schwende_alpstein_appen_xv1np1.mp4",
    likes: 321,
    comments: 70,
  },
  {
    id: 6,
    videoUrl: "https://res.cloudinary.com/dfng3w9jm/video/upload/v1738419064/reels%20video/The_gentle_rhythm_of_two_calming_waves_intertwining_creates_a_serene_atmosphere._As_they_meet_they_produce_a_soothing_melody_the_soft_rush_of_water_blending_with_the_tranquil_sounds_of_the_ocean._This_harmonio_1_imhqry.mp4",
    likes: 654,
    comments: 70,
  },
  {
    id: 7,
    videoUrl: "https://res.cloudinary.com/dfng3w9jm/video/upload/v1738419062/reels%20video/Snapsave.app_-f71qsartrtJQvYgFNZH1loGOoeOiLdhM_mglxax.mp4",
    likes: 365,
    comments: 70,
  },
  {
    id: 8,
    videoUrl: "https://res.cloudinary.com/dfng3w9jm/video/upload/v1738419062/reels%20video/Feel_The_Vibe_Sukoon_...._reelkrofeelkro_reelsinstagram_reelitfeelit_trendingreels_trendingnow_trending_summer_tulipgarden_tulipgardenkashmir_tulipgardensrinagar_summervibes_summerinkashmir_summer_tra_w8ggz5.mp4",
    likes: 764,
    comments: 70,
  },
  {
    id: 9,
    videoUrl: "https://res.cloudinary.com/dfng3w9jm/video/upload/v1738419087/reels%20video/The_whirlpool_under_this_river_was_absolutely_amazing_.Captured_in_New_Zealand_.More_johnderting_._newzealand_dn2wxo.mp4",
    likes: 84,
    comments: 70,
  },
  {
    id: 12,
    videoUrl: "https://res.cloudinary.com/dfng3w9jm/video/upload/v1738419101/reels%20video/__48m.66_Reel_Real_._._._._._._._Like_comment_and_follow_._._._._._._._._alhamdulillah_foryoupage_foryou_islam_explorepage_quranpost_muslim_dark_darkedits_48m.66_viralreels_dark_nasheed_ufbqwu.mp4",
    likes: 345,
    comments: 70,
  },
  {
    id: 13,
    videoUrl: "https://res.cloudinary.com/dfng3w9jm/video/upload/v1738419063/reels%20video/But_no_internet_HighRes_wallpaper_download_link_in_bio._afternoonvibes_home_nature_peace_sunset_chilltime_homelife_naturewalk_peaceful_sunsetviews_relaxing_homedecor_naturephotography_serenity_sunsetl_gsbp4c.mp4",
    likes: 260,
    comments: 70,
  },
  {
    id: 14,
    videoUrl: "https://res.cloudinary.com/dfng3w9jm/video/upload/v1738419063/reels%20video/Snapsave.app_AQO29lQee5aLbrOaRQg6vbQiY37VitI5Y8WThEXteSQ7FpQk0vB_7SFt3saYEOjYMCqynr0azOenq5SBQaAeoZ0j_zsciur.mp4",
    likes: 4500,
    comments: 70,
  },
];

  return (
   <HomeReels currentUser={currentUser?.user} reelsData={reelsData}/>
  )
}

export default Page