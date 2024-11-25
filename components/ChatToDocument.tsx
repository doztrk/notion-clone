"use client";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import React, { FormEvent, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import * as Y from "yjs";
import { BotIcon, MessageCircleCode } from "lucide-react";

function ChatToDocument({ doc }: { doc: Y.Doc }) {
	const [input, setInput] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [isPending, startTransition] = useTransition();
	const [summary, setSummary] = useState("");
	const [question, setQuestion] = useState("");

	const handleAskQuestion = async (e: FormEvent) => {
		e.preventDefault();
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<Button asChild variant={"outline"}>
				<DialogTrigger>
					<MessageCircleCode className="mr-2" />
					Chat To Document
				</DialogTrigger>
			</Button>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Ask Something</DialogTitle>

					<DialogDescription>
						Ask your question and GPT will answer it
					</DialogDescription>
				</DialogHeader>

				{summary && (
					<div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100">
						<div className="flex">
							<BotIcon className="w-10 flex-shrink-0" />
							<p className="font-bold">
								GPT {isPending ? "is thinking..." : "says:"}
							</p>
						</div>
						<div>{isPending ? "Thinking..." : summary}</div>
					</div>
				)}

				<form className="flex gap-2" onSubmit={handleAskQuestion}>
					<Input
						type="text"
						placeholder="i.e what is this about?"
						className="w-full"
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<Button type="submit" disabled={!input || isPending}>
						{isPending ? "Asking..." : "Ask"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default ChatToDocument;
