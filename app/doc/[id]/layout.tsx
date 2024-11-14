import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";
import React, { use } from "react";

function DocLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ id: string }>;
}) {
	auth();
	const { id } = use(params);
	return <RoomProvider roomId={id}>{children}</RoomProvider>;
}

export default DocLayout;
