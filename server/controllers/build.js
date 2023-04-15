// In buildController.js:
import Build from "../modals/build.js";

export async function addBuild(req, res) {
  try {
    const body = req.body;
    const { name_build, Bundel, lastbuild, releaseType, status, buildvariant_config, isincrementversioncode_config, buildvariant } = req.body;
    const app_apk = req.file.path;

    const newBuild = new Build({
      name_build,
      Bundel,
      lastbuild,
      releaseType,
      status,
      buildvariant_config,
      isincrementversioncode_config,
      buildvariant,
      app_apk
    });

    await newBuild.save();

    res.status(201).send({ message: 'Data saved successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
}
