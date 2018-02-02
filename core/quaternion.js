import { Matrix4 } from "noobgl-matrix";

export default class Quaternion {
	constructor( x = 0, y = 0, z = 0, w = 1 ){

		this.set(x, y, z, w);

		return this;

	}
	get dot(){

		return Quaternion.dot(this.x, this.y, this.z, this.w);

	}
	set( x, y, z, w ){

		this.x = x;

		this.y = y;

		this.z = z;

		this.w = w;

		return this;

	}
	inverse(){

		this.set(this.x * -1, this.y * -1, this.z * -1, this.w);

	}
	conjugate(){

		return this.inverse().normalize();

	}
	clone(){

		return new Quaternion(this.x, this.y, this.z, this.w);

	}
	static dot( quaternionA, quaternionB ){

		return (quaternionA.x * quaternionB.x) + (quaternionA.y * quaternionB.y) + (quaternionA.z * quaternionB.z) + (quaternionA.w * quaternionB.w);

	}
	static from( source ){

		var x = 0;

		var y = 0;

		var z = 0;

		var w = 1;

		if( source instanceof Matrix4 ){

			let trace = source.m11 + source.m22 + source.m33;

			if( trace > 0 ){

				let sum = 0.5 / Math.sqrt(trace + 1);

				x = (source.m32 - source.m23) * sum;

				y = (source.m13 - source.m31) * sum;

				z = (source.m21 - source.m12) * sum;

				w = 0.25 / sum;

			}
			else if( source.m11 > source.m22 && source.m11 > source.m33 ){

				let sum = 2.0 * Math.sqrt(1.0 + source.m11 - source.m22 - source.m33);

				this.x = 0.25 * sum;

				this.y = (source.m12 + source.m21) / sum;

				this.z = (source.m13 + source.m31) / sum;

				this.w = (source.m32 - source.m23) / sum;

			}
			else if( source.m22 > source.m33 ){

				let sum = 2.0 * Math.sqrt(1.0 + source.m22 - source.m11 - source.m33);

				this.x = (source.m12 + source.m21) / sum;

				this.y = 0.25 * sum;

				this.z = (source.m23 + source.m32) / sum;

				this.w = (source.m13 - source.m31) / sum;


			}
			else {

				let s = 2.0 * Math.sqrt(1.0 + source.m33 - source.m11 - source.m22);

				this.x = (source.m13 + source.m31) / sum;

				this.y = (source.m23 + source.m32) / sum;

				this.z = 0.25 * sum;

				this.w = (source.m21 - source.m12) / sum;

			}

		}
		else {

			console.error("Cannot create Quaternion from unsuported object type.");

		}

		return new Quaternion(x, y, z, w);

	}
}