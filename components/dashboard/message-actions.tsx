"use client";

import { useState, useEffect } from "react";
import { MoreVertical, Edit, Trash2, Copy, Reply, Forward } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface MessageActionsProps {
  messageId: number;
  isMine: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number, type: "now" | "offline" | "timed") => void;
  onCopy: (id: number) => void;
  onReply: (id: number) => void;
  onForward: (id: number) => void;
}

export function MessageActions({
  messageId,
  isMine,
  onEdit,
  onDelete,
  onCopy,
  onReply,
  onForward,
}: MessageActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteType, setDeleteType] = useState<"now" | "offline" | "timed">(
    "now"
  );

  // Load saved delete preference from localStorage
  useEffect(() => {
    const savedDeleteType = localStorage.getItem(
      "taptalk-delete-preference"
    ) as "now" | "offline" | "timed" | null;
    if (savedDeleteType) {
      setDeleteType(savedDeleteType);
    }
  }, []);

  const handleDelete = () => {
    // Save the selected delete preference
    localStorage.setItem("taptalk-delete-preference", deleteType);
    onDelete(messageId, deleteType);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-gray-400 hover:text-white hover:bg-[#222] opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreVertical className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 bg-[#111] border-[#333] text-white"
        >
          <DropdownMenuItem
            className="hover:bg-[#222] focus:bg-[#222] cursor-pointer"
            onClick={() => onCopy(messageId)}
          >
            <Copy className="h-4 w-4 mr-2" />
            <span>Copy Message</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="hover:bg-[#222] focus:bg-[#222] cursor-pointer"
            onClick={() => onReply(messageId)}
          >
            <Reply className="h-4 w-4 mr-2" />
            <span>Reply</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="hover:bg-[#222] focus:bg-[#222] cursor-pointer"
            onClick={() => onForward(messageId)}
          >
            <Forward className="h-4 w-4 mr-2" />
            <span>Forward</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-[#333]" />

          {isMine && (
            <DropdownMenuItem
              className="hover:bg-[#222] focus:bg-[#222] cursor-pointer"
              onClick={() => onEdit(messageId)}
            >
              <Edit className="h-4 w-4 mr-2" />
              <span>Edit Message</span>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            className="hover:bg-[#222] focus:bg-[#222] cursor-pointer text-destructive hover:text-destructive"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            <span>Delete Message</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-[#111] border-[#333] text-white">
          <DialogHeader>
            <DialogTitle>Delete Message</DialogTitle>
          </DialogHeader>

          <RadioGroup
            value={deleteType}
            onValueChange={(value: any) => setDeleteType(value)}
            className="mt-4"
          >
            <div className="flex items-start space-x-2 mb-3">
              <RadioGroupItem
                value="now"
                id="delete-now"
                className="mt-1 text-[#6C5CE7]"
              />
              <div className="grid gap-1">
                <Label htmlFor="delete-now" className="font-medium">
                  Delete Now
                </Label>
                <p className="text-sm text-gray-400">
                  Immediately delete this message after confirmation.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2 mb-3">
              <RadioGroupItem
                value="offline"
                id="delete-offline"
                className="mt-1 text-[#6C5CE7]"
              />
              <div className="grid gap-1">
                <Label htmlFor="delete-offline" className="font-medium">
                  Auto Delete After Offline
                </Label>
                <p className="text-sm text-gray-400">
                  Message will be deleted when you go offline.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <RadioGroupItem
                value="timed"
                id="delete-timed"
                className="mt-1 text-[#6C5CE7]"
              />
              <div className="grid gap-1">
                <Label htmlFor="delete-timed" className="font-medium">
                  Auto Delete After 3 Days
                </Label>
                <p className="text-sm text-gray-400">
                  Message will be automatically deleted after 3 days.
                </p>
              </div>
            </div>
          </RadioGroup>

          <DialogFooter className="flex justify-between mt-4">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              className="border-[#333] text-white hover:bg-[#222]"
            >
              Cancel
            </Button>
            <Button onClick={handleDelete} variant="destructive">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
