import { Mail, MailOpen, Trash2 } from "lucide-react";
import { messageAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin-auth";
import { adminMessages } from "@/lib/queries";
import { faNum, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  await requireAdmin();
  const messages = await adminMessages();
  const unread = messages.filter((message) => !message.isRead).length;

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">INBOX</p>
        <h1 className="mt-2 text-2xl font-extrabold">پیام‌ها و درخواست‌ها</h1>
        <p className="mt-1 text-xs text-cream/45">
          {faNum(messages.length)} پیام · {faNum(unread)} خوانده‌نشده
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="rounded-2xl border border-sand/10 bg-onyx/40 p-10 text-center text-sm text-cream/45">
          پیامی وجود ندارد. پیام‌های فرم تماس و درخواست‌های عمده در این صفحه ثبت می‌شوند.
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((message) => (
            <article
              key={message.id}
              className={`rounded-2xl border p-4 ${
                message.isRead ? "border-sand/10 bg-onyx/30" : "border-gold/25 bg-gold/[0.04]"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-cream">
                    {message.name}
                    <span className="mr-2 rounded-full border border-sand/20 px-2 py-0.5 text-[0.6rem] font-normal text-cream/50">
                      {message.subject || "بدون موضوع"}
                    </span>
                  </p>
                  <p className="mt-1 font-latin text-[0.66rem] text-cream/40" dir="ltr">
                    {message.phone} {message.email ? `· ${message.email}` : ""}
                  </p>
                  <p className="mt-1 text-[0.62rem] text-cream/30">{formatDate(message.createdAt)}</p>
                </div>
                <div className="flex gap-2">
                  <form action={messageAction}>
                    <input type="hidden" name="id" value={message.id} />
                    <input type="hidden" name="intent" value={message.isRead ? "unread" : "read"} />
                    <button
                      type="submit"
                      className="flex items-center gap-1 rounded-full border border-sand/20 px-2.5 py-1 text-[0.62rem] text-cream/60 hover:border-gold hover:text-gold"
                    >
                      {message.isRead ? <MailOpen size={11} /> : <Mail size={11} />}
                      {message.isRead ? "خوانده‌نشده" : "خوانده شد"}
                    </button>
                  </form>
                  <form action={messageAction}>
                    <input type="hidden" name="id" value={message.id} />
                    <input type="hidden" name="intent" value="delete" />
                    <button
                      type="submit"
                      className="grid h-7 w-7 place-items-center rounded-full border border-clay/30 text-clay/70 hover:bg-clay/10"
                      aria-label="حذف پیام"
                    >
                      <Trash2 size={11} />
                    </button>
                  </form>
                </div>
              </div>
              <p className="mt-3 whitespace-pre-line border-t border-sand/10 pt-3 text-xs leading-6 text-cream/60">
                {message.message}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
