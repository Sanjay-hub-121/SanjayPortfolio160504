export default function SanjayAvatar() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-bg-card to-bg-primary p-8">
      <div className="flex flex-col items-center gap-6">
        {/* Head */}
        <div className="relative w-24 h-24 mb-2">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-700 to-amber-900 rounded-full" />
          {/* Hair */}
          <div className="absolute top-0 left-0 right-0 h-10 bg-black rounded-t-full" />
          {/* Eyes */}
          <div className="absolute top-8 left-6 w-3 h-3 bg-white rounded-full" />
          <div className="absolute top-8 right-6 w-3 h-3 bg-white rounded-full" />
          {/* Mouth */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-6 h-1 bg-amber-900 rounded-full" />
        </div>

        {/* Body */}
        <div className="w-20 h-20 bg-gradient-to-b from-slate-700 to-slate-800 rounded-lg flex items-center justify-center">
          <div className="w-16 h-16 bg-blue-900 rounded flex items-center justify-center">
            <span className="text-2xl">💻</span>
          </div>
        </div>

        {/* Name */}
        <h2 className="text-2xl font-display font-bold text-white text-center">Sanjay G</h2>
        <p className="text-sm text-slate-400 text-center">UI/UX Designer & Developer</p>
      </div>
    </div>
  );
}
