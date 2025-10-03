import { PersonType } from "@/types/api.types";
import "./profileCard.scss";
import Link from "next/link";
import ProfileImage from "./profileImage";

export default function ProfileCard({ data }: { data?: PersonType }) {
  return (
    <Link href={`/people/${data?.id}`} key={data?.id}>
      <div className="card">
        <center>
          <ProfileImage />
          <div className="Name">
            <p>{data?.name || "Unknown"}</p>
          </div>
        </center>
      </div>
    </Link>
  );
}
