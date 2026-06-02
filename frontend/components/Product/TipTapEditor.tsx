"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  ListOrdered,
  Code,
  Type,
  Quote,
  List,
} from "lucide-react";
import { useEffect, useState } from "react";

interface TipTapEditorProps {
  value: string;
  onChange: (html: string) => void;
  disabled?: boolean;
}

export const TipTapEditor: React.FC<TipTapEditorProps> = ({
  value,
  onChange,
  disabled,
}) => {
  const [, setUpdate] = useState(0);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit, Underline, Link],
    content: value || "<p></p>",
    editable: !disabled,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    onSelectionUpdate: () => setUpdate((u) => u + 1),
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "<p></p>");
    }
  }, [value, editor]);

  if (!editor) return null;

  const handleToggle = (
    format:
      | "bold"
      | "italic"
      | "underline"
      | "orderedList"
      | "bulletList"
      | "link"
      | "blockquote"
      | "codeBlock"
      | "heading",
    options?: any
  ) => {
    if (!editor) return;

    switch (format) {
      case "bold":
        editor.chain().focus().toggleBold().run();
        break;
      case "italic":
        editor.chain().focus().toggleItalic().run();
        break;
      case "underline":
        editor.chain().focus().toggleUnderline().run();
        break;
      case "orderedList":
        if (editor.state.doc.content.size <= 2)
          editor.chain().focus().insertContent("<p></p>").run();
        editor.chain().focus().toggleOrderedList().run();
        break;
      case "bulletList":
        if (editor.state.doc.content.size <= 2)
          editor.chain().focus().insertContent("<p></p>").run();
        editor.chain().focus().toggleBulletList().run();
        break;
      case "link":
        if (options?.href)
          editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: options.href })
            .run();
        break;
      case "blockquote":
        if (editor.state.doc.content.size <= 2)
          editor.chain().focus().insertContent("<p></p>").run();
        editor.chain().focus().toggleBlockquote().run();
        break;
      case "codeBlock":
        if (editor.state.doc.content.size <= 2)
          editor.chain().focus().insertContent("<p></p>").run();
        editor.chain().focus().toggleCodeBlock().run();
        break;
      case "heading":
        editor
          .chain()
          .focus()
          .toggleHeading({ level: options.level || 1 })
          .run();
        break;
    }

    setUpdate((u) => u + 1);
  };

  return (
    <div className="border dark:border-0 rounded-md bg-input/30">
      <div className="flex flex-wrap gap-2 border-b p-2">
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("bold") ? "default" : "secondary"}
          onClick={() => handleToggle("bold")}
        >
          <Bold size={16} />
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("italic") ? "default" : "secondary"}
          onClick={() => handleToggle("italic")}
        >
          <Italic size={16} />
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("underline") ? "default" : "secondary"}
          onClick={() => handleToggle("underline")}
        >
          <UnderlineIcon size={16} />
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("orderedList") ? "default" : "secondary"}
          onClick={() => handleToggle("orderedList")}
        >
          <ListOrdered size={16} />
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("bulletList") ? "default" : "secondary"}
          onClick={() => handleToggle("bulletList")}
        >
          <List size={16} />
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("blockquote") ? "default" : "secondary"}
          onClick={() => handleToggle("blockquote")}
        >
          <Quote size={16} />
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("codeBlock") ? "default" : "secondary"}
          onClick={() => handleToggle("codeBlock")}
        >
          <Code size={16} />
        </Button>
        {[1, 2, 3].map((level) => (
          <Button
            key={level}
            type="button"
            size="sm"
            variant={
              editor.isActive("heading", { level }) ? "default" : "secondary"
            }
            onClick={() => handleToggle("heading", { level })}
          >
            <Type size={16} /> H{level}
          </Button>
        ))}
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("link") ? "default" : "secondary"}
          onClick={() => {
            const url = prompt("Enter URL");
            if (url) handleToggle("link", { href: url });
          }}
        >
          <LinkIcon size={16} />
        </Button>
      </div>

      <EditorContent
        editor={editor}
        className="h-96 p-4 focus:outline-none tiptap-content overflow-y-auto"
      />
    </div>
  );
};
