package Spring_Core.Spring_Core;

public class Project {
	int pid;
	String duration;
	int cost;
	
	Project(){}

	public Project(int pid, String duration, int cost) {
		super();
		this.pid = pid;
		this.duration = duration;
		this.cost = cost;
	}

	public int getPid() {
		return pid;
	}

	public void setPid(int pid) {
		this.pid = pid;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public int getCost() {
		return cost;
	}

	public void setCost(int cost) {
		this.cost = cost;
	}

	@Override
	public String toString() {
		return "Project [pid=" + pid + ", duration=" + duration + ", cost=" + cost + "]";
	}
}
