import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Mail, ShieldBan, Trash } from "lucide-react";
import { fetcher } from "@/lib/fetcher";
import { apiUser } from "@/lib/api";

function UserDetails({
    user,
    onClose,
    handleAction,
}: {
    user: any;
    onClose: () => void;
    handleAction: (id: string, status: boolean) => void;
}) {
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(Boolean(user?.active))

    useEffect(() => {
        setActive(user?.active)
    }, [user])

    if (!user) return null;


    const handleDeactivate = async () => {
        try {
            setLoading(true);
            if (active) {
                const res = await fetcher(apiUser.deactivateUsers(user.id), { method: "PATCH", data: { active: false } });
            } else {
                const res = await fetcher(apiUser.activeUser(user.id), { method: "PATCH", data: { active: true } });
            }
            handleAction(user.id, !active);
            setActive(!active)
        } catch (err) {
            console.error("Error updating status", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={!!user} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="p-4">
                <div className="py-4 font-rubik-400">
                    <div className="flex gap-3">
                        <div className="rounded-[20px] w-1/3">
                            <Image
                                src={
                                    user.avatarUrl ||
                                    "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                                }
                                height={100}
                                width={100}
                                alt="user-avatar"
                                className="rounded-md w-full h-full"
                            />
                        </div>
                        <div className="flex flex-col gap-3 w-2/3">
                            <div>
                                <Label htmlFor="name" className="mb-1 text-[14px] text-[#484848]">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    defaultValue={user.name || ""}
                                    disabled
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <Label htmlFor="email" className="mb-1 text-[14px] text-[#484848]">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="text"
                                    defaultValue={user.email || ""}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>

                    <div className="my-3 mt-6 flex flex-col gap-3">
                        <div className="flex gap-3">
                            <div className="block w-1/2">
                                <Label className="mb-1 text-[14px] text-[#484848]">
                                    Signup Method
                                </Label>
                                <div className="mt-1">
                                    <Badge variant={"outline"} className="text-rubik-400 rounded-2xl">
                                        <span className="text-[14px] font-light flex gap-2 items-center">
                                            <Mail className="h-4 w-4" /> {user.signupMethod || "Email"}
                                        </span>
                                    </Badge>
                                </div>
                            </div>
                            <div className="w-1/2">
                                <Label className="mb-1 text-[14px] text-[#484848]">
                                    Subscription Plan
                                </Label>
                                <Input
                                    type="text"
                                    defaultValue={user.subscriptionPlan || "Free"}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="w-1/2">
                                <Label className="mb-1 text-[14px] text-[#484848]">
                                    Trial Ends
                                </Label>
                                <Input
                                    type="text"
                                    defaultValue={user.trialEnds || "Not mentioned"}
                                    disabled
                                />
                            </div>
                            <div className="w-1/2">
                                <Label className="mb-1 text-[14px] text-[#484848]">
                                    Last Login
                                </Label>
                                <Input
                                    type="text"
                                    defaultValue={user.lastLogin || "Not mentioned"}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="w-1/2">
                                <Label className="mb-1 text-[14px] text-[#484848]">
                                    Meditations Played
                                </Label>
                                <Input
                                    type="text"
                                    defaultValue={user.meditationsPlayed?.toString() || "0"}
                                    disabled
                                />
                            </div>
                            <div className="w-1/2">
                                <Label className="mb-1 text-[14px] text-[#484848]">
                                    Liked Meditations
                                </Label>
                                <Input
                                    type="text"
                                    defaultValue={user.likedMeditations?.toString() || "0"}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="w-full">
                            <Label className="mb-1 text-[14px] text-[#484848]">
                                Total Listening Time
                            </Label>
                            <Input
                                type="text"
                                defaultValue={user.totalListeningTime || "0 hrs"}
                                disabled
                            />
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex gap-2">
                    <Button
                        variant="outline"
                        className="font-rubik-500 cursor-pointer"
                        onClick={handleDeactivate}
                        disabled={loading}
                    >
                        <ShieldBan className="mr-2 h-4 w-4" />
                        {loading
                            ? "Processing..."
                            : active
                                ? "Deactivate Account"
                                : "Activate Account"}
                    </Button>
                    <Button variant="outline" className="font-rubik-500 cursor-pointer" disabled={loading}>
                        <Trash className="w-4 h-4 mr-2" />
                        Delete User
                    </Button>
                    <Button
                        className="font-rubik-500 bg-[#1F5D57] text-white"
                        disabled={loading}
                    >
                        Send email
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default UserDetails;
