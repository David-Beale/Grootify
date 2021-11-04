import React, { forwardRef, useCallback, useMemo } from "react";
import { FixedSizeList as List, areEqual } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

import { useStore } from "../../Store/store";
import TrackResult from "../TrackResult/TrackResult";
import { StyledOuterLeft } from "../InfiniteLoader/InfiniteLoaderStyle";
import { useHeight } from "../InfiniteLoader/useHeight";
import InnerElement from "../InfiniteLoader/InnerElement";

const OuterElement = forwardRef(({ children, style, onScroll }, ref) => {
  const open = useStore((state) => state.playlistTracksOpen);
  return (
    <StyledOuterLeft onScroll={onScroll} open={open} height={style.height}>
      {children.props.children.length ? children : <>No Songs Found</>}
    </StyledOuterLeft>
  );
});

const Row = React.memo(function Row(props) {
  const setPlaylistSong = useStore((state) => state.setPlaylistSong);
  const { data, index, style } = props;
  const item = data.items[index];
  if (!item) return null;
  const key = item.id;
  return (
    <TrackResult
      key={key}
      track={item}
      top={style.top}
      selectSong={setPlaylistSong}
    />
  );
}, areEqual);

export default function PlaylistTracks() {
  const playlistTracks = useStore((state) => state.playlistTracks);

  const hasNextPage = useStore((state) => !state.playlistRequestsFinised);
  const loadMoreItems = useStore((state) => state.playlistRequestsLoadNextPage);

  const isItemLoaded = useCallback(
    (index) => !hasNextPage || index < playlistTracks.length,
    [hasNextPage, playlistTracks]
  );

  const itemCount = useMemo(() => {
    return hasNextPage ? playlistTracks.length + 1 : playlistTracks.length;
  }, [hasNextPage, playlistTracks]);

  const height = useHeight();

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
      threshold={5}
    >
      {({ onItemsRendered, ref }) => (
        <List
          ref={ref}
          height={height}
          itemCount={itemCount}
          itemSize={67}
          onItemsRendered={onItemsRendered}
          outerElementType={OuterElement}
          innerElementType={InnerElement}
          itemData={{
            items: playlistTracks,
          }}
        >
          {Row}
        </List>
      )}
    </InfiniteLoader>
  );
}
