"use client";
import { useMyPresence, useOthers } from "@liveblocks/react/suspense";
import React from "react";

function LiveCursorProvider({ children }: { children: React.ReactNode }) {
	const [myPresence, updateMyPresence] = useMyPresence();
	const others = useOthers();

	function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
		const cursor = { x: Math.floor(e.pageX), y: Math.floor(e.pageY) };
		updateMyPresence({ cursor });
	}
	function handlePointerLeave() {
		updateMyPresence({ cursor: null });
	}

	return (
		<div onPointerMove={handlePointerMove} o nPointerLeave={handlePointerLeave}>
			{/* Render Cursors */}
			{others
				.filter((other) => other.presence.cursor !== null)
				.map(({ connectionId, presence, info }) => (
					<FollowPointer
						key={connectionId}
						info={info}
						x={presence.cursor!.x}
						y={presence.cursor!.y}
					/>
				))}
            {children}
		</div>
	);
}

export default LiveCursorProvider;
