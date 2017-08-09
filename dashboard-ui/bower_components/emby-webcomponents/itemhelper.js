define(["apphost","globalize"],function(appHost,globalize){"use strict";function getDisplayName(item,options){if(!item)throw new Error("null item passed into getDisplayName");options=options||{},"Timer"===item.Type&&(item=item.ProgramInfo||item);var name=("Program"!==item.Type&&"Recording"!==item.Type||!item.IsSeries&&!item.EpisodeTitle?item.Name:item.EpisodeTitle)||"";if("TvChannel"===item.Type)return item.ChannelNumber?item.ChannelNumber+" "+name:name;if("Episode"===item.Type&&0===item.ParentIndexNumber)name=globalize.translate("sharedcomponents#ValueSpecialEpisodeName",name);else if(("Episode"===item.Type||"Program"===item.Type)&&null!=item.IndexNumber&&null!=item.ParentIndexNumber&&options.includeIndexNumber!==!1){var displayIndexNumber=item.IndexNumber,number=displayIndexNumber,nameSeparator=" - ";options.includeParentInfo!==!1?number="S"+item.ParentIndexNumber+":E"+number:nameSeparator=". ",item.IndexNumberEnd&&(displayIndexNumber=item.IndexNumberEnd,number+="-"+displayIndexNumber),number&&(name=name?number+nameSeparator+name:number)}return name}function supportsAddingToCollection(item){var invalidTypes=["Person","Genre","MusicGenre","Studio","GameGenre","BoxSet","Playlist","UserView","CollectionFolder","Audio","TvChannel","Channel","Program","MusicAlbum","Timer","SeriesTimer"];return("Recording"!==item.Type||"Completed"===item.Status)&&(!item.CollectionType&&invalidTypes.indexOf(item.Type)===-1&&"Photo"!==item.MediaType)}function supportsAddingToPlaylist(item){return"Program"!==item.Type&&("TvChannel"!==item.Type&&("Timer"!==item.Type&&("SeriesTimer"!==item.Type&&("Photo"!==item.MediaType&&(("Recording"!==item.Type||"Completed"===item.Status)&&(item.MediaType||item.IsFolder||"Genre"===item.Type||"MusicGenre"===item.Type||"MusicArtist"===item.Type))))))}function canEdit(user,item){var itemType=item.Type;return"UserRootFolder"!==itemType&&"UserView"!==itemType&&("Program"!==itemType&&(("Recording"!==item.Type||"Completed"===item.Status)&&user.Policy.IsAdministrator))}function isLocalItem(item){return!(!item||!item.Id||0!==item.Id.indexOf("local"))}return{getDisplayName:getDisplayName,supportsAddingToCollection:supportsAddingToCollection,supportsAddingToPlaylist:supportsAddingToPlaylist,isLocalItem:isLocalItem,canIdentify:function(user,itemType){return!("Movie"!==itemType&&"Trailer"!==itemType&&"Series"!==itemType&&"Game"!==itemType&&"BoxSet"!==itemType&&"Person"!==itemType&&"Book"!==itemType&&"MusicAlbum"!==itemType&&"MusicArtist"!==itemType||!user.Policy.IsAdministrator)},canEdit:canEdit,canEditImages:function(user,item){var itemType=item.Type;return"Photo"!==item.MediaType&&("UserView"===itemType?!!user.Policy.IsAdministrator:("Recording"!==item.Type||"Completed"===item.Status)&&("Timer"!==itemType&&"SeriesTimer"!==itemType&&canEdit(user,item)))},canSync:function(user,item){return!(user&&!user.Policy.EnableContentDownloading)&&item.SupportsSync},canShare:function(item,user){return"Program"!==item.Type&&("TvChannel"!==item.Type&&("Timer"!==item.Type&&("SeriesTimer"!==item.Type&&(("Recording"!==item.Type||"Completed"===item.Status)&&(user.Policy.EnablePublicSharing&&appHost.supports("sharing"))))))},enableDateAddedDisplay:function(item){return!item.IsFolder&&item.MediaType&&"Program"!==item.Type&&"TvChannel"!==item.Type&&"Trailer"!==item.Type},canMarkPlayed:function(item){if("Program"===item.Type)return!1;if("Video"===item.MediaType){if("TvChannel"!==item.Type)return!0}else if("Audio"===item.MediaType){if("AudioPodcast"===item.Type)return!0;if("AudioBook"===item.Type)return!0}return"Series"===item.Type||"Season"===item.Type||"BoxSet"===item.Type||"Game"===item.MediaType||"Book"===item.MediaType||"Recording"===item.MediaType},canRate:function(item){return"Program"!==item.Type&&"Timer"!==item.Type&&"SeriesTimer"!==item.Type}}});