import { identityCard } from "@/data/profile";

/** A specimen card: the facts, set like a catalogue entry. */
export function IdentityCard() {
  return (
    <aside className="border border-line bg-paper-raised p-6 md:p-7">
      <p className="annotation mb-6">Identity / specimen card</p>

      <dl className="space-y-5">
        {Object.entries(identityCard).map(([key, values]) => (
          <div key={key} className="border-t border-line pt-3">
            <dt className="meta">{key}</dt>
            <dd className="mt-1.5 space-y-0.5">
              {values.map((v) => (
                <span key={v} className="block text-sm">
                  {v}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
