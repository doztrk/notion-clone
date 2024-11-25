"use client";
import * as Y from "yjs";
import React, { FormEvent, useState, useTransition } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Button } from "./ui/button";
import {
	BotIcon,
	Clipboard,
	ClipboardCheck,
	LanguagesIcon,
} from "lucide-react";
import { toast } from "sonner";

type Language =
	| "english"
	| "spanish"
	| "french"
	| "german"
	| "italian"
	| "portuguese"
	| "russian"
	| "chinese"
	| "japanese"
	| "korean";

const languages: Language[] = [
	"english",
	"spanish",
	"french",
	"german",
	"italian",
	"portuguese",
	"russian",
	"chinese",
	"japanese",
	"korean",
];

function TranslateDocument({ doc }: { doc: Y.Doc }) {
	console.log("Document Data:", doc.get("document-store").toJSON());
	const [isOpen, setIsOpen] = useState(false);
	const [summary, setSummary] = useState("");
	const [question, setQuestion] = useState("");
	const [language, setLanguage] = useState<string>("");
	const [isPending, startTransition] = useTransition();
	const [clipboard, setClipboard] = useState(false);

	const handleAskQuestion = async (e: FormEvent) => {
		setClipboard(false);
		e.preventDefault();

		startTransition(async () => {
			const documentData = doc.get("document-store").toJSON();

			const res = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						documentData,
						targetLang: language,
					}),
				}
			);

			if (res.ok) {
				const { translated_text } = await res.json();
				setSummary(translated_text);
				toast.success("Summary generated successfully");
			}
		});
	};

	const copyToClipboard = () => {
		if (summary) {
			navigator.clipboard.writeText(summary);
			toast.success("Text copied to clipboard!");
		} else {
			toast.error("No text to copy!");
		}
		setClipboard(true);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<Button asChild variant={"outline"}>
				<DialogTrigger>
					<LanguagesIcon />
					Translate
				</DialogTrigger>
			</Button>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Translate the document</DialogTitle>

					<DialogDescription>
						Select a Language and AI will translate a summary of the document in
						the selected language.
					</DialogDescription>

					<hr className="mt-5" />

					{question && <p className="mt-5 text-gray-500">Q: {question}</p>}
				</DialogHeader>

				{summary}

				<form className="flex gap-2" onSubmit={handleAskQuestion}>
					<Select
						value={language}
						onValueChange={(value) => setLanguage(value)}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select a language" />
						</SelectTrigger>

						<SelectContent>
							{languages.map((language) => (
								<SelectItem key={language} value={language}>
									{language.charAt(0).toUpperCase() + language.slice(1)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Button type="submit" disabled={!language || isPending}>
						{isPending ? "Translating..." : "Translate"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default TranslateDocument;