function PopularItem(data) {
  return (
    <div className="mt-4 py-2 cursor-pointer group">
      <div>
        <p className="text-lg text-fuchsia-600 transition-colors group-hover:text-fuchsia-700 pb-1">{data.data.original_title}</p>
        <p className="text-sm text-slate-600 transition-colors group-hover:text-slate-700">{data.data.release_date}</p>
      </div>
    </div>
  );
}

export default PopularItem;
