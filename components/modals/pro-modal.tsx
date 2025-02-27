"use client"
import React from 'react';
import {Dialog, DialogContent} from "@/components/ui/dialog";
import {useProModal} from "@/hooks/use-pro-modal";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {useAction} from "@/hooks/use-action";
import {toast} from "sonner";
import { stripeCheckOut } from '@/actions/stripe-checkout';


export const ProModal = () => {
	const proModal = useProModal();
	const {execute, isLoading} = useAction(stripeCheckOut, {
		onSuccess: (data)=> {
			window.location.href = data as string;
		},
		onError: (error) => {
			toast.error(error);
		}
	});
	const onClick = () => {
		execute({})
	}
	return (
		<Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
			<DialogContent className="max-w-md p-0 overflow-hidden">
				<div className="aspect-video relative flex items-center justify-center">
					<Image src="/pro.jpeg" alt="hero " className="object-cover" fill />
				</div>
				<div className="text-neutral-700 mx-auto space-y-6 p-6">
					<h2 className="font-semibold text-xl">
						Upgrade to Taskify Pro Today!
					</h2>
					<p className="text-xs font-semibold text-neutral-600">
						Explore the best of Taskify
					</p>
					<div className="pl-3">
						<ul className="text-sm list-disc">
							<li>Unlimited Boards</li>
							<li>Advanced Checklist</li>
							<li>Admin & Security features</li>
							<li>And more !!!</li>
						</ul>
					</div>
					<Button variant="primary" className="w-full"
                     disabled={isLoading} onClick={onClick}
                     >
						Upgrade
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};