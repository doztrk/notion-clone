import React, { FormEvent, useEffect, useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Editor from "./Editor";

function Document({ id }: { id: string }) {
	const [input, setInput] = useState("");
	const [isUpdating, startTransition] = useTransition();
	const [data, loading, error] = useDocumentData(doc(db, "documents", id));

	useEffect(() => {
		if (data) {
			setInput(data.title);
		}
	}, [data]);

	const updateTitle = (e: FormEvent) => {
		e.preventDefault();

		if (input.trim()) {
			startTransition(async () => {
				await updateDoc(doc(db, "documents", id), {
					title: input,
				});
			});
		}
	};
	return (
		<div>
			<div className="flex max-w-4xl mx-auto justify-between pb-5">
				<form className="flex flex-1 space-x-2" onSubmit={updateTitle}>
					{/* Update Title .... */}

					<Input value={input} onChange={(e) => setInput(e.target.value)} />

					<Button disabled={isUpdating} type="submit">
						{isUpdating ? "Updating..." : "Update"}
					</Button>

					{/* IF */}
					{/* isOwner && InviteUser,DeleteDocument */}
				</form>

				<div>
					<div>
						{/* Manage Users */}

						{/* Avatar */}
					</div>

					<hr className="pb-10" />

					<Editor />

					{/* Collaborative Editor */}
				</div>
			</div>
		</div>
	);
}

export default Document;
