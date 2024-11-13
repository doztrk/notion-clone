"use client";

import { db } from "@/firebase";
import { doc } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";

function SidebarOption({ href, id }: { href: string; id: string }) {
	const [data, loading, error] = useDocumentData(doc(db, "documents", id));
	const pathName = usePathname();
	const isActive = href.includes(pathName) && pathName !== "/";

	if (!data) return null;
	return (
		<Link 
			href={href}
			className={`relative border p-2 rounded-md ${
				isActive ? "bg-gray-300 font-bold " : "border-gray-400"
			}`}
		>
			<p className="truncate">{data.title}</p>
			{/*  */}
		</Link>
	);
}

export default SidebarOption;
